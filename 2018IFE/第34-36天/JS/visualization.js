/**
 * @file 数据可视化
 */
var tableObj = document.getElementById('table-wrapper');
tableObj.addEventListener('mouseover', function (e) {
    // 只有有数据的行才有效
    if (e.target.getAttribute('table') !== 'head' 
        && e.target.nodeName !== 'TABLE' 
        && e.target.nodeName !== 'DIV') {
        var lineChart = new drawLineChart();
        var barChart = new drawBarChart();
        var parent = e.target.parentElement;
        var monthlyData = [];
        // 获取当前行所有text
        // unshift方便之后对数组切片
        [...parent.children]
            .forEach((item, index)=>{monthlyData.unshift(item.innerHTML);}); 
        // 只去除12个月的数据
        monthlyData = monthlyData.slice(0, 12).reverse();
        // 仿造原始数据格式
        // 主要是因为之前设计的可视化程序 是按照这个格式来的
        var data = [{
            sale:monthlyData
        }];
        // 数据可视化
        lineChart.drawLineByCanvas(data);
        barChart.drawBarBySvg(data);
    }
});
tableObj.addEventListener('mouseleave', function(e) {
    // 这段是form.js里面的
    var data = myFilter(selectedProduct, selectedRegion);
    data = sortData(data, 'product');
    var lineChart = new drawLineChart();
    var barChart = new drawBarChart();
    // 设置颜色序列
    lineChart.dataStrokeColor = ['#f74747', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.dataFillColor =  ['#f74747', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.canvasWidth = 1300;
    lineChart.axisWidth = 1300;
    lineChart.dataSpace = 85;
    lineChart.drawMultiLineByCanvas(data);
    barChart.barColor  = ['#c6f716', '#76fc5c', '#074d86'];
    // 在一行显示实在是太不爽了 所以换行了
    barChart.svgWidth = 1300;
    barChart.axisWidth = 1300;
    barChart.barSpace = 25;
    barChart.barWidth = 80;
    barChart.drawMultiBarBySvg(data);
});
