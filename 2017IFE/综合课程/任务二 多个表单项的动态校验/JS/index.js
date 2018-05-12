// 提示文字段元素对象
var NoticeObjList = document.querySelectorAll("form p:nth-of-type(2n)");
var nameNotice = document.getElementById("nameNotice");
var passwordNotice = document.getElementById("passwordNotice");
var comfirmPasswordNotice = document.getElementById("comfirmPasswordNotice");
var emailNotice = document.getElementById("emailNotice");
var phoneNumberNotice = document.getElementById("phoneNumberNotice");
//表单对象控件
var inputObjList = document.getElementsByTagName("input");
var nameText = document.getElementById("name");
var passwordText = document.getElementById("password");
var comfirmPasswordText = document.getElementById("comfirmPassword");
var emailText = document.getElementById("email");
var phoneNumberText = document.getElementById("phoneNumber");
var submitBtn = document.getElementById("submit");
// 暂存密码方便比对
var passwordTemp;

/**
 * 焦点函数
 */
function inputFocus () {
    this.parentElement.nextElementSibling.removeAttribute("class");
    this.style.borderColor = "#62AEEC";
    this.style.boxShadow = "0 5px 5px 5px #DDEDFA";
}

/**
 * 公共失去焦点函数
 */
function inputBlur () {
    this.removeAttribute("style");
}

// 为input元素注册公共焦点和失去焦点事件
// 使用事件监听器注册是为了之后注册多个相同的事件，比如多个失去焦点事件
for (var i = 0; i < inputObjList.length; i++) {
    inputObjList[i].addEventListener("focus", inputFocus, false);
    inputObjList[i].addEventListener("blur", inputBlur, false);
}

// 名称input注册失去焦点事件
nameText.addEventListener("blur", nameCheck);
/**
 * 名称检查函数
 */
function nameCheck () {
    var text = nameText.value;
    // 记录总长
    var lengthTemp = 0;
    // 匹配汉字和汉字字符 gim模式匹配所有字符
    var regx = {0:/[^\x00-\xff]/gim, 1:/[\d]/gim, 2:/[A-z]/gim, 3:/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/gim};
    /**** 
    匹配任意一个数字/[\d]/gim
    匹配任意英文大小写字母/[A-z]/gim
    匹配英文符号/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/gim
    ****/

    // match方法返回匹配的字符数组
    for (var i = 0; i < 4; i++) {
        if (text.match(regx[i]) !== null) {
            console.log(text.match(regx[i]));
            if (i === 0 ) {
                // 中文字符占两个长度
                lengthTemp += (text.match(regx[i]).length * 2);
            }else {
                lengthTemp += text.match(regx[i]).length;
            }
            console.log("长度: "+lengthTemp);
        }
    }
    if (!lengthTemp) {
        nameNotice.innerHTML = "姓名不能为空";
        nameText.style.borderColor = "red";
        nameNotice.style.color = "red";
        return false;
    }else if (lengthTemp > 16) {
        nameNotice.innerHTML = "最多输入16个字符";
        nameText.style.borderColor = "red";
        nameNotice.style.color = "red";
        return false;
    }else if (lengthTemp < 4) {
        nameNotice.innerHTML = "至少输入4个字符";
        nameText.style.borderColor = "red";
        nameNotice.style.color = "red";
        return false;
    }else {
        nameNotice.innerHTML = "输入正确";
        nameText.style.borderColor = "green";
        nameNotice.style.color = "green";
        return true;
    }
}

// 密码输入input注册失去焦点函数
passwordText.addEventListener("blur", passwordCheck);
/**
 * 密码检查函数
 */
function passwordCheck () {
    passwordTemp = passwordText.value;
    if (passwordTemp.length < 8) {
        passwordText.style.borderColor = "red";
        passwordNotice.innerHTML = "密码长度最少为8位";
        passwordNotice.style.color = "red";
        return false;
    }else {
        passwordText.style.borderColor = "green";
        passwordNotice.innerHTML = "密码可用";
        passwordNotice.style.color = "green";
        return true;
    }
}

// 密码确认输入input注册失去焦点函数
comfirmPasswordText.addEventListener("blur", comfirmPasswordCheck);
/**
 * 确认密码检查函数
 * 是否为空--->密码长度----->密码一致性
 */
function comfirmPasswordCheck () {
    var comfirmPassword = comfirmPasswordText.value;
    if (passwordTemp === undefined || passwordTemp === "") {
        comfirmPasswordText.style.borderColor = "red";
        comfirmPasswordNotice.innerHTML = "请先设置密码";
        comfirmPasswordNotice.style.color = "red";
        return false;
    }else if (passwordTemp.length < 8) {
        comfirmPasswordText.style.borderColor = "red";
        comfirmPasswordNotice.innerHTML = "密码长度最少为8位";
        comfirmPasswordNotice.style.color = "red";
        return false;
    }else if (comfirmPassword !== passwordTemp) {
        comfirmPasswordText.style.borderColor = "red";
        comfirmPasswordNotice.innerHTML = "密码输入不一致";
        comfirmPasswordNotice.style.color = "red";
        return false;
    }else {
        comfirmPasswordText.style.borderColor = "green";
        comfirmPasswordNotice.innerHTML = "密码输入一致";
        comfirmPasswordNotice.style.color = "green";
        return true;
    }
}

// 邮箱输入input注册失去焦点函数
emailText.addEventListener("blur", emailCheck);
/**
 * 邮箱检查函数
 */
function emailCheck () {
    var email = emailText.value;;
    // 网上复制的..邮箱正则表达式
    var regx = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (email === "") {
        emailText.style.borderColor = "red";
        emailNotice.innerHTML = "请输入邮箱";
        emailNotice.style.color = "red";
        return false;
    }else if (email.match(regx) === null) {
        emailText.style.borderColor = "red";
        emailNotice.innerHTML = "邮箱格式错误";
        emailNotice.style.color = "red";
        return false;
    }else {
        emailText.style.borderColor = "green";
        emailNotice.innerHTML = "邮箱格式正确";
        emailNotice.style.color = "green";
        return true;
    }
}

// 手机号码输入input注册失去焦点函数
phoneNumberText.addEventListener("blur", phoneNumberCheck);
/**
 * 手机号码检查函数
 */
function phoneNumberCheck () {
    var phoneNum = phoneNumberText.value;
    var regx = /[0-9]{11}/;
    if (phoneNum === "") {
        phoneNumberText.style.borderColor = "red";
        phoneNumberNotice.innerHTML = "请输入手机号码";
        phoneNumberNotice.style.color = "red";
        return false;
    }else if (phoneNum.length > 11 || phoneNum.match(regx) === null) {
        // 不判断多于11位的手机号，正则匹配会有bug
        phoneNumberText.style.borderColor = "red";
        phoneNumberNotice.innerHTML = "手机号码格式错误";
        phoneNumberNotice.style.color = "red";
        return false;
    } else {
        phoneNumberText.style.borderColor = "green";
        phoneNumberNotice.innerHTML = "手机号码格式正确";
        phoneNumberNotice.style.color = "green";
        return true;
    }
}

// 提交按钮点击事件
submitBtn.onclick = submit;
/**
 * 提交按钮事件函数
 */
function submit () {
    for (var i = 0; i < inputObjList.length; i++) {
        NoticeObjList[i].removeAttribute("class");
        inputObjList[i].removeAttribute("style");
    }
    
    var flagName = nameCheck();
    var flagPassword = passwordCheck();
    var flagComfirmPassword = comfirmPasswordCheck();
    var flagEmail = emailCheck();
    var flagPhoneNumber = phoneNumberCheck();

    if (!(flagName && flagPassword && flagComfirmPassword && flagEmail && flagPhoneNumber)) {
        alert("输入有误！");
    }
}