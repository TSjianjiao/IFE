/**
 * 折线图构造函数
 */
function drawLineChart() {
    // 输入数据
    this.inputData = null;
    // 画布宽高
    this.canvasWidth = 620;
    this.canvasHeight = 500;
    // 画布对象
    this.canvasObj = document.getElementById('my-canvas');
    // 轴的高度，宽度
    this.axisWidth = 780;
    this.axisHeight = 300;
    // 数据点的半径，颜色，线的颜色，宽度 
    this.dataRadius = 5;
    this.dataFillColor = '#3eeaf0';
    this.axisColor = '#5a5d61';
    this.dataStrokeColor = '#3eeaf0';
    this.dataLineWidth = 2;
    // 定义好没两个数据点之间的横向间隔距离
    this.dataSpace = 40;
}

/**
 * 绘制折线图
 * @param {array} inputData 
 */
drawLineChart.prototype.drawLineByCanvas = function (inputData) {
    var context = this.canvasObj.getContext('2d');
    // 定义好折线图绘制区域的高度，宽
    this.canvasObj.setAttribute('width', this.canvasWidth);
    this.canvasObj.setAttribute('height', this.canvasHeight);
    // 拿到折线图中的最大值Max
    // 保存数据
    var data = inputData[0].sale.slice(0);
    // 拿到柱状图中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    // 减去一个数据点的直径，防止最大值数据点超出去
    var scale = (this.axisHeight - this.dataRadius*2)/maxData;
    // 绘制横轴、纵轴
    var axisPath = new Path2D(`M ${this.dataSpace} ${this.axisHeight-10} h ${this.axisWidth-20} m ${-this.axisWidth+20} 0 v ${-this.axisHeight+20}`);
    context.strokeStyle = this.axisColor;
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
        context.fillStyle = this.axisColor;
        context.fillText(YLabel, 15, this.axisHeight - YLabel * scale + 5);
        // 画网格
        context.moveTo(50, this.axisHeight - YLabel * scale);
        context.strokeStyle = '#d8d7d7';
        context.lineTo(this.axisWidth, this.axisHeight - YLabel * scale);
        context.stroke();
        YLabel += bias;
    }
    // 遍历画出每个月的折线图
    var preData = [];
    inputData[0].sale.forEach(function (item, index) {
        drawLineChart.call(this);
        // 计算将要绘制数据点的坐标
        var dataY =  this.axisHeight - item * scale;
        // index * dataRadius*2 + (index + 1) * dataSpace
        var dataX = index * (this.dataRadius*2 + this.dataSpace) + this.dataSpace;
        // 绘制数据点
        context.beginPath();
        context.arc(dataX, dataY, this.dataRadius, 0, Math.PI * 2, true);
        context.fillStyle = this.dataFillColor;
        context.strokeStyle = this.dataStrokeColor;
        if (index !== 0) {
            // 绘制这个数据点和上一个数据点的连线
            context.lineTo(preData[0], preData[1]);
        }
        context.fill();
        context.stroke();
        // 绘制横轴标签
        context.beginPath();
        context.fillStyle = this.axisColor;
        context.strokeStyle = this.axisColor;
        context.moveTo(dataX, this.axisHeight - 10);
        context.lineTo(dataX, this.axisHeight+5);
        context.font='16px microsoft yahei';
        context.fillText(`${index+1}月`, dataX - 10, this.axisHeight+20);
        context.stroke();
        context.fill();
        // 记录下当前数据点的数据用于下一个点时绘制连线
        preData = [];
        preData.push(dataX, dataY);
    });
}

/**
 * 绘制多条折线图
 */
drawLineChart.prototype.drawMultiLineByCanvas = function (inputData) {
    var context = this.canvasObj.getContext('2d');
    // 定义好折线图绘制区域的高度，宽
    this.canvasObj.setAttribute('width', this.canvasWidth);
    this.canvasObj.setAttribute('height', this.canvasHeight);
    // 拿到折线图中的最大值Max
    // 保存数据 将所选数据平铺
    var data = [];
    inputData.forEach(function (item, index) {
        item.sale.forEach(function(item, index) {
            data.push(item);
        });
    });
    // 拿到所有数据中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例this.
    // 减去一个数据点的直径，防止最大值数据点超出去
    var scale = (this.axisHeight - this.dataRadius*2)/maxData;
    // 绘制横轴、纵轴
    var axisPath = new Path2D(`M ${this.dataSpace} ${this.axisHeight-10} h ${this.axisWidth-20} m ${-this.axisWidth+20} 0 v ${-this.axisHeight+20}`);
    context.strokeStyle = this.axisColor;
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
        context.fillStyle = this.axisColor;
        context.fillText(YLabel, 50, this.axisHeight - YLabel * scale + 5);
        // 画网格
        context.moveTo(80, this.axisHeight - YLabel * scale);
        context.strokeStyle = '#d8d7d7';
        context.lineTo(this.axisWidth, this.axisHeight - YLabel * scale);
        context.stroke();
        YLabel += bias;
    }
    // 遍历画出每选择的折线图
    // 记录数据数量
    var dataNum = inputData.length;
    // 计算数据标签位置间隔
    var dataLabelSpac;
    // 数据标签前换行
    var dataLabelNewLine = 20;
    inputData.forEach(function(item, index) {
        // 选择颜色
        var currentFillColor = this.dataFillColor[index];
        var currentStrokeColor = this.dataStrokeColor[index];
        // 记录数据标签
        var dataLabel = [item.product, item.region];
        item.sale.forEach(function (item, index) {
            // 计算将要绘制数据点的坐标
            var dataY =  this.axisHeight - item * scale;
            // index * dataRadius*2 + (index + 1) * dataSpace
            var dataX = index * (this.dataRadius*2 + this.dataSpace) + this.dataSpace;
            // 绘制数据点
            context.beginPath();
            context.fillStyle = currentFillColor;
            context.strokeStyle = currentStrokeColor;
            context.arc(dataX, dataY, this.dataRadius, 0, Math.PI * 2, true);
            if (index !== 0) {
                // 绘制这个数据点和上一个数据点的连线
                context.lineTo(preData[0], preData[1]);
            }
            context.fill();
            context.stroke();
            // 绘制横轴标签
            context.beginPath();
            context.fillStyle = this.axisColor;
            context.strokeStyle = this.axisColor;
            context.moveTo(dataX, this.axisHeight - 10);
            context.lineTo(dataX, this.axisHeight+5);
            context.font='16px microsoft yahei';
            context.fillText(`${index+1}月`, dataX - 10, this.axisHeight+20);
            context.stroke();
            context.fill();
            // 记录下当前数据点的数据用于下一个点时绘制连线
            preData = [];
            preData.push(dataX, dataY);
        }, this);
        // 绘制数据标签
        // 三个标签后换行
        context.beginPath();
        context.fillStyle = currentFillColor;
        context.strokeStyle = currentStrokeColor;
        if (index % 3 === 0) {
            dataLabelNewLine += dataLabelNewLine;
            dataLabelSpace = 80;
            context.fillText(`${dataLabel[0]}${dataLabel[1]}`, dataLabelSpace + 40, dataLabelNewLine);
        }
        else {
            context.fillText(`${dataLabel[0]}${dataLabel[1]}`, dataLabelSpace + 40, dataLabelNewLine);
        }
        context.stroke();
        context.fill();
        // 更新数据标签坐标
        dataLabelSpace += 100;
    }, this)  // 将this指向对象
}

/**
 * 柱状图构造函数
 */
function drawBarChart() {
    this.inputData = null;
    this.svg = document.getElementById('my-svg');
    // 柱状图绘制区域的高度，宽度
    this.svgWidth = 640;
    this.svgHeight = 400;
    // 坐标区域宽度高度
    this.axisWidth = 780;
    this.axisHeight = 300;
    // 每一个柱子的宽度及柱子的间隔宽度
    this.barWidth = 35;
    this.barSpace = 15;
    // 柱子颜色，轴的颜色
    this.barColor = '#2e70eb';
    this.axisColor = '#5a5d61';
}

/**
 * 绘制柱状图
 * @param {array} inputdata 
 */
drawBarChart.prototype.drawBarBySvg = function (inputData) {
    this.svg.innerHTML = '';
    this.svg.setAttribute('width', this.svgWidth);
    this.svg.setAttribute('height', this.svgHeight);
    // 保存数据
    var data = inputData[0].sale.slice(0);
    // 拿到柱状图中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    var scale = this.axisHeight/maxData;
    // 绘制横轴及纵轴
    var axisPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var axisPathOrder = `M 25 ${this.axisHeight-10} h ${this.axisWidth-20} m ${-this.axisWidth+20} 0 v ${-this.axisHeight+20}`;
    axisPath.setAttribute('d', axisPathOrder);
    axisPath.setAttribute('stroke', this.axisColor);
    axisPath.setAttribute('stroke-width', '2px');
    this.svg.appendChild(axisPath);
    // 绘制纵轴标签
    var YLabel;
    if (maxData < 100)  bias = 20;  
    else bias = 50;
    YLabel = bias;
    while(maxData > YLabel) {
        var YText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var YPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        YText.setAttribute('stroke', this.axisColor);
        YText.setAttribute('style', 'font-size:16px');
        YText.setAttribute('x', '0');
        YText.setAttribute('y', `${this.axisHeight - YLabel * scale - 5}`);
        YText.innerHTML = `${YLabel}`;
        this.svg.appendChild(YText);
        // 画网格
        var YPathOrder = `M 26 ${this.axisHeight - YLabel * scale - 10} h ${this.axisWidth - 26}`
        YPath.setAttribute('d', YPathOrder);
        YPath.setAttribute('stroke', '#d8d7d7');
        YPath.setAttribute('stroke-width', '2px');
        this.svg.appendChild(YPath);
        YLabel += bias;
    }
    // 遍历画出每个月的柱状图
    inputData[0].sale.forEach(function (item, index) {
        // 计算将要绘制柱子的高度和位置
        var currentBarHeight =  item * scale;
        // index * barWidth + (index + 1) * barSpace
        var currentBarX = index * (this.barWidth + this.barSpace) + this.barSpace;
        // 绘制每一个柱子
        var barPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var barPathOrder = `M 25 ${this.axisHeight-10-1} m ${currentBarX} 0 v ${-currentBarHeight} h ${this.barWidth} v ${currentBarHeight}`;
        barPath.setAttribute('d', barPathOrder);
        barPath.setAttribute('fill', this.barColor);
        this.svg.appendChild(barPath);
        // 绘制横坐标刻度
        var XText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        XText.setAttribute('stroke', this.axisColor);
        XText.setAttribute('style', 'font-size:16px');
        XText.innerHTML = `${index+1}月`
        XText.setAttribute('x', `${currentBarX+this.barWidth/2}`);
        XText.setAttribute('y', `${this.axisHeight+5}`);
        this.svg.appendChild(XText);
    }, this); 
}

/**
 * 绘制多个柱状图
 * @param {array} inputdata 
 */
drawBarChart.prototype.drawMultiBarBySvg = function (inputData) {
    this.svg.innerHTML = '';
    this.svg.setAttribute('width', this.svgWidth);
    this.svg.setAttribute('height', this.svgHeight);
    // 拿到折线图中的最大值Max
    // 保存数据 将所选数据平铺
    var data = [];
    inputData.forEach(function (item, index) {
        // 只保存销量数据
        item.sale.forEach(function(item, index) {
            data.push(item);
        });
    });
    // 拿到所有数据中的最大值Max
    var maxData = data.sort((a, b)=>{return a-b}).pop();
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    var scale = this.axisHeight/maxData;
    // 绘制横轴及纵轴
    var axisPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var axisPathOrder = `M 25 ${this.axisHeight-10} h ${this.axisWidth-20} m ${-this.axisWidth+20} 0 v ${-this.axisHeight+20}`;
    axisPath.setAttribute('d', axisPathOrder);
    axisPath.setAttribute('stroke', this.axisColor);
    axisPath.setAttribute('stroke-width', '2px');
    this.svg.appendChild(axisPath);
    // 绘制纵轴标签
    var YLabel;
    if (maxData < 100)  bias = 20;  
    else bias = 50;
    YLabel = bias;
    while(maxData > YLabel) {
        var YText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var YPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        YText.setAttribute('stroke', this.axisColor);
        YText.setAttribute('style', 'font-size:16px');
        YText.setAttribute('x', '0');
        YText.setAttribute('y', `${this.axisHeight - YLabel * scale - 5}`);
        YText.innerHTML = `${YLabel}`;
        this.svg.appendChild(YText);
        // 画网格
        var YPathOrder = `M 26 ${this.axisHeight - YLabel * scale - 10} h ${this.axisWidth - 26}`
        YPath.setAttribute('d', YPathOrder);
        YPath.setAttribute('stroke', '#d8d7d7');
        YPath.setAttribute('stroke-width', '2px');
        this.svg.appendChild(YPath);
        YLabel += bias;
    }
    // 判断使用产品还是区域聚合柱状图
    // true按照产品聚合
    var flag;
    [...document.querySelectorAll('#table-wrapper td')].forEach(function(item, index){
        // 元素有rowspan属性
        if(item.hasAttribute('rowspan')) {
            flag = inputData.filter(function (i) {
                    return item.innerHTML === i.product
                });
            // 如果含有rowspan的元素内容是product的 flag为true
            if(inputData.filter((i)=>{return item.innerHTML === i.product}).length !== 0) return flag = true;
            else return flag = false;    
        }
    });
    if (flag) {
        // 聚合的柱体数量
        var barNum;
        var productNum = 0;
        var temp = '';
        // 根据相同product名称计算数量
        inputData.forEach(function (item, index) {
            // 如果和前一个名字不同
            if(item.product !== temp) {
                productNum++;
                barNum = 1;
                temp = item.product;
            }
            else barNum++;
        });
        // 每个柱体的宽度
        var perBarWidth = this.barWidth / (barNum * productNum);
        // 每个月数据总宽度
        var perMonthWidth =  barNum * productNum * perBarWidth;
        // 每个月数据间隔
        var currentBarX = this.barSpace;
        // 数据标签间隔
        var dataLabelSpace = 55 ; 
        // 挨着数据顺序画柱子  每隔barNum个柱子换颜色重置  每隔barNum * productNum重复12个月 加间隔
        // 第一层循环随便找了一个12个月的数据，仅仅是为了循环12次而已
        inputData[0].sale.forEach(function(Item, monthIndex) {
            // 更换颜色 标志
            var colorIndex = -1;
            var preName = '';
            inputData.forEach(function(item, index) {
            // 每行数据的同一个月销售量
            // 计算将要绘制柱子的高度和位置
            var currentBarHeight = item.sale[monthIndex] * scale;
            // 每行数据的标签
            var eachLabel = item.region;
            // 更换颜色判断
            // 如果名字和上一个不相同
            if(item.product !== preName) {
                // 更新标志位
                colorIndex++;
                preName = item.product;
                // 绘制标签 指示颜色对应的数据
                // 只画一次
                if (monthIndex === 0) {
                    var dataLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    dataLabel.setAttribute('stroke', this.barColor[colorIndex]);
                    dataLabel.setAttribute('style', 'font-size:16px');
                    dataLabel.innerHTML = `${preName}`
                    dataLabel.setAttribute('x', `${dataLabelSpace += dataLabelSpace}`);
                    dataLabel.setAttribute('y', '20');
                    this.svg.appendChild(dataLabel);
                }
            }
            // 绘制每一个柱子
            var barPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var barPathOrder = `M 25 ${this.axisHeight-10-1} m ${currentBarX} 0 v ${-currentBarHeight} h ${perBarWidth} v ${currentBarHeight}`;
            barPath.setAttribute('fill', this.barColor[colorIndex]);
            barPath.setAttribute('d', barPathOrder);
            this.svg.appendChild(barPath);
            // 更新位置
            currentBarX += perBarWidth;
            },this)
            // 每个月数据绘制完成后
            // 绘制横坐标刻度
            var XText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            XText.setAttribute('stroke', this.axisColor);
            XText.setAttribute('style', 'font-size:16px');
            XText.innerHTML = `${monthIndex + 1}月`
            XText.setAttribute('x', `${currentBarX - perMonthWidth/2}`);
            XText.setAttribute('y', `${this.axisHeight+5}`);
            this.svg.appendChild(XText);
            // 更新起始位置
            currentBarX += this.barSpace;
        }, this);
    }
    // 按照地区聚合 和按照产品聚合原理一样
    else {
        // 聚合的柱体数量
        var barNum;
        var temp = '';
        // 根据相同region名称计算数量
        inputData.forEach(function (item, index) {
            if(item.region !== temp) {
                barNum = 1;
                temp = item.region;
            }
            else {
                barNum++;
            }
        });
        // 每个柱体的宽度
        var perBarWidth = this.barWidth / barNum;
        // 每个月数据总宽度
        var perMonthWidth =  barNum * perBarWidth;
        // 每个月数据间隔
        var currentBarX = this.barSpace;
        // 数据标签间隔
        var dataLabelSpace = 20 ; 
        // 挨着顺序画柱子加名称换颜色 每隔barNum个柱子就加间隔 重复12个月
        inputData[0].sale.forEach(function(Item, monthIndex) {
            inputData.forEach(function(item, index) {
            // 每行数据的同一个月销售量
            // 计算将要绘制柱子的高度和位置
            var currentBarHeight = item.sale[monthIndex] * scale;
            // 绘制数据标签 只画一次
            if (monthIndex === 0) {
                var dataLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
                dataLabel.setAttribute('stroke', this.barColor[index]);
                dataLabel.setAttribute('style', 'font-size:16px');
                dataLabel.innerHTML = `${item.product}`
                dataLabel.setAttribute('x', `${dataLabelSpace += dataLabelSpace}`);
                dataLabel.setAttribute('y', '20');
                this.svg.appendChild(dataLabel);
            }
            // 绘制每一个柱子
            var barPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var barPathOrder = `M 25 ${this.axisHeight-10-1} m ${currentBarX} 0 v ${-currentBarHeight} h ${perBarWidth} v ${currentBarHeight}`;
            barPath.setAttribute('fill', this.barColor[index]);
            barPath.setAttribute('d', barPathOrder);
            this.svg.appendChild(barPath);
            // 更新位置
            currentBarX += perBarWidth;
            }, this);
            // 每个月数据绘制完成后
            // 绘制横坐标刻度
            var XText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            XText.setAttribute('stroke', this.axisColor);
            XText.setAttribute('style', 'font-size:16px');
            XText.innerHTML = `${monthIndex + 1}月`
            XText.setAttribute('x', `${currentBarX - perMonthWidth/2}`);
            XText.setAttribute('y', `${this.axisHeight+5}`);
            this.svg.appendChild(XText);
            // 更新起始位置
            currentBarX += this.barSpace;
        }, this);
    }
}