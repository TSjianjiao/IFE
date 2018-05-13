var schoolRadio = document.getElementById("school");
var companyRadio = document.getElementById("company");
var schoolSelect = document.getElementById("school-select");
var companySelect = document.getElementById("company-select");

// 页面加载默认选项 火狐里面不知道为什么checked没用
schoolSelect.style.display = "block";
// 学校点击事件
schoolRadio.onclick = function () {
    companySelect.removeAttribute("style");
    schoolSelect.style.display = "block";
    // schoolSelect.setAttribute("style", "display:block;");
}
// 公司点击事件
companyRadio.onclick = function () {
    schoolSelect.removeAttribute("style");
    companySelect.style.display = "block";
    // companySelect.setAttribute("style", "display:block;");
}