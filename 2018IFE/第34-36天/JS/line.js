/**
 * 绘制折线图
 * @param {array} inputData 
 */

function drawLineByCanvas(inputData) {
    var canvasObj = document.getElementById('my-canvas');
    var context = canvasObj.getContext('2d');
    // 定义好折线图绘制区域的高度，宽
    var canvasWidth = 600;
    var canvasHeight = 500;
    canvasObj.setAttribute('width', canvasWidth);
    canvasObj.setAttribute('height', canvasHeight);
    // 轴的高度，宽度
    var axisWidth = 780;
    var axisHeight = 300;
    // 定义好每一个数据点的半径，颜色，线的颜色，宽度  
    var dataRadius = 5;
    var dataFillColor = '#3eeaf0';
    var axisColor = '#5a5d61';
    var dataStrokeColor = '#3eeaf0';
    var dataLineWidth = 2;
    // 定义好没两个数据点之间的横向间隔距离
    var dataSpace = 40;
    // 拿到折线图中的最大值Max
    // 保存数据
    var data = inputData[0].sale.slice(0);
    // 拿到柱状图中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    var minData = data.sort((a, b)=>{return a-b}).shift();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    // 数据相差太大的时候 会导致小数据太低，需要调整scale
    // 减去一个数据点的直径，防止最大值数据点超出去
    var scale = (axisHeight - dataRadius*2)/maxData;
    // 绘制横轴、纵轴
    var axisPath = new Path2D(`M ${dataSpace} ${axisHeight-10} h ${axisWidth-20} m ${-axisWidth+20} 0 v ${-axisHeight+20}`);
    context.strokeStyle = axisColor;
    context.stroke(axisPath);
    // 绘制纵轴
    var YLabel;
    if (maxData < 100)  bias = 20;  
    else bias = 50;
    YLabel = bias;
    while(maxData > YLabel) {
        // 纵轴标签
        context.beginPath();
        context.font = '16px microsoft yahei';
        context.fillStyle = axisColor;
        context.fillText(YLabel, 15, axisHeight - YLabel * scale + 5);
        // 画网格
        context.moveTo(50, axisHeight - YLabel * scale);
        context.strokeStyle = '#d8d7d7';
        context.lineTo(axisWidth, axisHeight - YLabel * scale);
        context.stroke();
        YLabel += bias;
    }
    // 遍历画出每个月的折线图
    var preData = [];
    inputData[0].sale.forEach(function (item, index) {
        // 计算将要绘制数据点的坐标
        var dataY =  axisHeight - item * scale;
        // index * barWidth + (index + 1) * barSpace
        var dataX = index * (dataRadius*2 + dataSpace) + dataSpace;
        // 绘制数据点
        context.beginPath();
        context.arc(dataX, dataY, dataRadius, 0, Math.PI * 2, true);
        context.fillStyle = dataFillColor;
        context.strokeStyle = dataStrokeColor;
        if (index !== 0) {
            // 绘制这个数据点和上一个数据点的连线
            context.lineTo(preData[0], preData[1]);
        }
        context.fill();
        context.stroke();
        // 绘制横轴标签
        context.beginPath();
        context.fillStyle = axisColor;
        context.strokeStyle = axisColor;
        context.moveTo(dataX, axisHeight - 10);
        context.lineTo(dataX, axisHeight+5);
        context.font='16px microsoft yahei';
        context.fillText(`${index+1}月`, dataX - 10, axisHeight+20);
        context.stroke();
        context.fill();
        // 记录下当前数据点的数据用于下一个点时绘制连线
        preData = [];
        preData.push(dataX, dataY);
    });
}

