/**
 * 绘制柱状图
 * @param {array} inputdata 
 */
function drawBarBySvg(inputData) {
    var svg = document.getElementById('my-svg');
    svg.innerHTML = '';
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    var svgWidth = 640;
    var svgHeight = 400;
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
    var axisWidth = 780;
    var axisHeight = 300;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    var barWidth = 35;
    var barSpace = 15;
    // 定义好柱子颜色，轴的颜色
    var barColor = '#2e70eb';
    var axisColor = '#5a5d61';
    // 保存数据
    var data = inputData[0].sale.slice(0);
    // 拿到柱状图中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    var scale = axisHeight/maxData;
    // 绘制横轴及纵轴
    var axisPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var axisPathOrder = `M 25 ${axisHeight-10} h ${axisWidth-20} m ${-axisWidth+20} 0 v ${-axisHeight+20}`;
    axisPath.setAttribute('d', axisPathOrder);
    axisPath.setAttribute('stroke', axisColor);
    axisPath.setAttribute('stroke-width', '2px');
    svg.appendChild(axisPath);
    // 绘制纵轴标签
    var YLabel;
    if (maxData < 100)  bias = 20;  
    else bias = 50;
    YLabel = bias;
    while(maxData > YLabel) {
        var YText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var YPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        YText.setAttribute('stroke', axisColor);
        YText.setAttribute('style', 'font-size:16px');
        YText.setAttribute('x', '0');
        YText.setAttribute('y', `${axisHeight - YLabel * scale - 5}`);
        YText.innerHTML = `${YLabel}`;
        svg.appendChild(YText);
        // 画网格
        var YPathOrder = `M 26 ${axisHeight - YLabel * scale - 10} h ${axisWidth - 26}`
        YPath.setAttribute('d', YPathOrder);
        YPath.setAttribute('stroke', '#d8d7d7');
        YPath.setAttribute('stroke-width', '2px');
        svg.appendChild(YPath);
        YLabel += bias;
    }
    // 遍历画出每个月的柱状图
    inputData[0].sale.forEach(function (item, index) {
        // 计算将要绘制柱子的高度和位置
        var currentBarHeight =  item * scale;
        // index * barWidth + (index + 1) * barSpace
        var currentBarX = index * (barWidth + barSpace) + barSpace;
        // 绘制每一个柱子
        var barPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var barPathOrder = `M 25 ${axisHeight-10-1} m ${currentBarX} 0 v ${-currentBarHeight} h ${barWidth} v ${currentBarHeight}`;
        barPath.setAttribute('d', barPathOrder);
        barPath.setAttribute('fill', barColor);
        svg.appendChild(barPath);
        // 绘制横坐标刻度
        var XText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        XText.setAttribute('stroke', axisColor);
        XText.setAttribute('style', 'font-size:16px');
        XText.innerHTML = `${index+1}月`
        XText.setAttribute('x', `${currentBarX+barWidth/2}`);
        XText.setAttribute('y', `${axisHeight+5}`);
        svg.appendChild(XText);
    }); 
}