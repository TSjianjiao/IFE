/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
    var data = [];
    var sourceUl = document.getElementById("source");
    var airList = sourceUl.children;
    var airPlace = [];
    var qualityList = [];
    // 获取一个以  ！HTMLcollction对象！  组成的<b>标签对象列表
    // 截取空气质量地点，截取字符串前两个字符
    for (var i = 0; i < airList.length; i++) {
        qualityList.push(airList[i].children);
        // 注意HTMLcollction对象的元素取值方式
        var qualityNum = qualityList[i].item(0).innerHTML;  
        // 将原来的数组相同位置用数值替换
        qualityList.splice(i, 1, Number(qualityNum));

        var airStr = airList[i].innerHTML;
        airPlace.push(airStr.slice(0, 2));
        data.push([airPlace[i], qualityList[i]]);
    }
/*
data = [
    ["北京", 90],
    ["北京", 90]
    ……
]
*/
return data;

}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    var qualityNum = [];
    var temp= [];
    var index = 0;
    // 比较函数，从大到小,注意多维数组的比较函数
    function compar (a, b) {
        var value1 = a[1];
        var value2 = b[1];
        if (value1<value2) {
            return 1
        }else if(value1>value2){
            return -1
        }else {
            return 0
        }
    }
    return data.sort(compar);
}
/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    var reUl = document.getElementById("resort");
    var rank = {0:"一", 1:"二", 2:"三", 3:"四", 4:"五", 5:"六", 6:"七", 7:"八", 8:"九"}
    for (var i = 0; i < data.length; i++) {
        // 注意要自加，不然就只有最后一名显示
        reUl.innerHTML += "<li>" + "第"+ rank[i] + "名：" 
                        + data[i][0] + "空气质量：" 
                        + "<b>" + data[i][1] + "</b></li>";
    }
}

function btnHandle() {
var aqiData = getData();
aqiData = sortAqiData(aqiData);
render(aqiData);
}

function init() {
// 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
document.getElementById("sort-btn").onclick = btnHandle;

}

init();