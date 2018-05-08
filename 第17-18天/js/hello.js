var flag = true;
function myGetEle(id) {
    return document.getElementById(id)
}
function showTime() {
    var myDate = new Date();
    myGetEle("time").innerHTML = myDate.toLocaleDateString() + "<br>" + myDate.toLocaleTimeString();
    if (flag) {
        if (0 <= myDate.getHours() && myDate.getHours()<=10) {
            confirm("上午好");
        }else if (11 <= myDate.getHours() && myDate.getHours()<=12) {
            confirm("中午好");
        }else if (13 <= myDate.getHours() && myDate.getHours()<=18) {
            confirm("下午好");
        }else if (19 <= myDate.getHours() && myDate.getHours()<=23) {
            confirm("晚上好");
        }
        flag = false;
    }

}
setInterval("showTime()",1000);
