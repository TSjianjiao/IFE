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
        var index = e.target.parentElement.getAttribute('num');
        // 这段是form.js里面的
        var data = myFilter(selectedProduct, selectedRegion);
        data = sortData(data, 'product');
        data = [data[index]];
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
    lineChart.dataStrokeColor = ['#3eeaf0', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.dataFillColor =  ['#3eeaf0', '#f39010', 
                                '#c6f716', '#76fc5c', 
                                '#1d8a34', '#1bdfae', 
                                '#074d86', '#5e0786', 
                                '#df1089']
    lineChart.canvasWidth = 1300;
    lineChart.axisWidth = 1300;
    lineChart.dataSpace = 85;
    lineChart.drawLineByCanvas(data);
    barChart.barColor  = ['#c6f716', '#76fc5c', '#074d86'];
    // 在一行显示实在是太不爽了 所以换行了
    barChart.svgWidth = 1300;
    barChart.axisWidth = 1300;
    barChart.barSpace = 25;
    barChart.barWidth = 80;
    barChart.drawMultiBarBySvg(data);
});
