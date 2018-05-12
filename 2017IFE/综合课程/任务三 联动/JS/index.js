// 单选按钮
var studentBtn = document.getElementById("student");
var officerBtn = document.getElementById("officer");
// 输入框label
var officerLabel = document.getElementById("work-unit-label");
var schoolLabel = document.getElementById("school-label");
// 输入框
var officerText = document.getElementById("work-unit");
var cityText = document.getElementById("city");
var schoolText = document.getElementById("school");
//option们 用json格式存储
var optionJson = {"北京":["北京大学", "北京大学", "北京大学", "北京大学", "北京大学", "北京大学"],
                  "上海":["上海大学", "上海大学", "上海大学", "上海大学", "上海大学", "上海大学"],
                  "深圳":["深圳大学", "深圳大学", "深圳大学", "深圳大学", "深圳大学", "深圳大学"],
                  "广州":["广州大学", "广州大学", "广州大学", "广州大学", "广州大学", "广州大学"],
                  "南京":["南京大学", "南京大学", "南京大学", "南京大学", "南京大学", "南京大学"],
                  "重庆":["重庆大学", "重庆大学", "重庆大学", "重庆大学", "重庆大学", "重庆大学"],
                  "天津":["天津大学", "天津大学", "天津大学", "天津大学", "天津大学", "天津大学"]};
//绑定事件
studentBtn.onclick = studentInput;
officerBtn.onclick = officerInput;
cityText.oninput = selectSchool;
// 默认选择 火狐浏览器不好使 不知道为什么
studentBtn.setAttribute("checked", "ture");
//默认选项
selectSchool();
/**
 * 选择在校生显示
 */
function studentInput () {
    officerLabel.setAttribute("class", "off");
    officerText.setAttribute("class", "off");
    schoolLabel.removeAttribute("class");
    cityText.removeAttribute("class");
    schoolText.removeAttribute("class");
}
/**
 * 选择在职显示
 */
function officerInput () {
    schoolLabel.setAttribute("class", "off");
    cityText.setAttribute("class", "off");
    schoolText.setAttribute("class", "off");
    officerLabel.removeAttribute("class");
    officerText.removeAttribute("class");
}

/**
 * 学校选择
 */
function selectSchool() {
    var city = cityText.value;
    var school = optionJson[city];
    // 先清空之前的列表 参数是节点
    var childNodes = schoolText.childNodes;
    console.log(childNodes[0]);
    /****!!!!! 注意 如果正向循环是不能把节点删除干净的，因为如火狐浏览器会把
    text也当做节点，所以序号会不一样，而删除了text下面的元素会移动，也就是改变
    了序号，所以这里倒着循环，*****/
    for(var i = childNodes.length - 1; i >= 0; i--) { 
        schoolText.removeChild(childNodes[i]); 
      }
    
    for (var i = 0; i < school.length; i++) {
        var newElement = document.createElement("option");
        newElement.innerHTML = school[i];
        schoolText.appendChild(newElement);
    }
}