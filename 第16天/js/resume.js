function myGetEle(id) {
    return document.getElementById(id)
}
var moreBtn = myGetEle("more");
var moreInfo = myGetEle("more-info");
moreBtn.onclick = function () {
    var str = "爱好：xxxxxxx";
    moreInfo.innerHTML = str;
    confirm(str);
    console.log(str);
}