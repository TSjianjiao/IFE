function myGetEle(id) {
    return document.getElementById(id)
}
// 乘法表函数
function multiTable () {
    // 先行后列
    var tr = "";
    for (var trIndex = 1; trIndex < 10; trIndex++) {
        // 列元素要在一行完成后清空
        var td = "";
        for (var tdIndex = 1; tdIndex <= trIndex; tdIndex++) {
            td += "<td>" + trIndex + "x" + tdIndex + "</td>";
        }
        tr += "<tr>" + td + "</tr>";
    }
    return tr
}
var multiplication = myGetEle("multiplication")
multiplication.innerHTML = multiTable();