/**
 * @file 时间操作
 */

/**
 * @name 在指定父元素中创建一个指定标签下的时间
 * @param {HTMLElement} parentElement 容器元素的父对象
 * @param {string} elementName 时间的容器元素名称
 * @param {array} timeArr 时间数组 [年,月,日,星期,小时,分,秒]
 * @param {boolean} reflash 要刷新时间必须置为ture 默认重新创造
 */
function createTimeInHtml(parentElement, elementName, timeArr, reflash = false) {
    // 时间格式
    var timeStr = `${timeArr[0]}年
                   ${timeArr[1]}月
                   ${timeArr[2]}日&nbsp
                   星期${timeArr[3]}&nbsp 
                   ${timeArr[4]}:${timeArr[5]}:${timeArr[6]}`;
    // 刷新模式启动就不需要再重新创建目标了
    if (reflash) {
        parentElement.children[0].innerHTML = timeStr;
    }
    else {
        // 防止reflash没有设置 先清除子元素
        var child = parentElement.children;
        if (child) {
            parentElement.removeChild(child[0]);
        }
        var elementObj = document.createElement(elementName);
        elementObj.innerHTML = timeStr;
        parentElement.appendChild(elementObj);
    }
}

/**
 * @name 获取时间数组
 * 返回一个全时间数组，要用哪个取哪个
 * 已经在前面加了0
 */
function getTimeArr() {
    // 星期几的格式
    var week = ['日', '一', '二', '三', '四', '五', '六']
    var timeArr = [];
    var date = new Date;
    // 获取年
    timeArr.push(date.getFullYear());
    // 获取月 先不考虑加0
    timeArr.push(date.getMonth() + 1);
    // 获取日
    timeArr.push(date.getDate());
    // 获取星期
    var current = week[date.getDay()];
    timeArr.push(current);
    // 获取小时
    timeArr.push(date.getHours());
    // 获取分
    timeArr.push(date.getMinutes());
    // 获取秒
    timeArr.push(date.getSeconds());
    // 添加0
    addZero(timeArr);
    return timeArr
}

/**
 * @name 给数字在前面加0
 * @param {array} timeArrData 
 */
function addZero(timeArrData) {
    var temp = [];
    // 月，日，小时，分钟，秒
    temp.push(timeArrData[1], timeArrData[2], timeArrData[4], timeArrData[5], timeArrData[6]);
    indexTemp = [1, 2, 4, 5, 6];
    // 每个元素如果小于10，也就是只有一位就加0
    temp.forEach(function (item, index) {
        if(item < 10) {
            temp[index] = `0${item}`; 
        }
    });
    for (x in indexTemp) {
        // 这里虽然是对timeArrData操作但是也会反映在原数组上
        // 不用返回
        timeArrData[indexTemp[x]] = temp.shift();
    }
}

/**
 * @name 获取年份列表
 * @param {number} num 列表包含的年份数量  [num\*以前,今年,num\*未来]
 */
function getYearList(num) {
    var date = new Date;
    var result = [];
    currentYear = date.getFullYear();
    if (currentYear - num < 1970) {
        alert('getYearList()参数错误');
        return
    }
    else {
        var pre = currentYear - num;
        var future = currentYear + num;
        // 今年以前num年
        for (var i = pre; i < currentYear; i++) {
            result.push(i);
        }
        // 保存今年
        result.push(currentYear);
        // 未来num年
        for (var k = currentYear + 1; k <= future; k++) {
            result.push(k);
        }
        return result
    }
}

/**
 * @name 获取月份列表 1~12
 */
function getMonthList() {
    var monthList = [];
    for (var i = 1; i <= 12; i++) {
        monthList.push(i);
    }
    return monthList
}

/**
 * @name 当前月份的天数列表
 * @param {number} year
 * @param {number} month 1~12
 */
function getDateList(year, month) {
    var maxDate;
    var dateList = [];
    if (month == 2) {
        // 4年一润 百年不润 400年再润
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            maxDate = 29;
        } 
        else {
            maxDate = 28;
        }
    } 
    else {
        // 除了这几个月和2月都是31天
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            maxDate = 30;
        } 
        else {
            maxDate = 31;
        }
    }
    // 存储天数
    for (var i = 1; i <= maxDate; i++) {
        dateList.push(i);
    }
    return dateList
}

/**
 * @name 返回这个月最大多少天
 * @param {number} year
 * @param {number} month 1~12
 */
function maxDays(year, month) {
    if (month == 2) {
        // 4年一润 百年不润 400年再润
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 29
        } 
        else {
            return  28;
        }
    } 
    else {
        // 除了这几个月和2月都是31天
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return  30;
        } 
        else {
            return  31;
        }
    }
}

/**
 * @name 获取星期列表
 */
function getDayList() {
    var DayList = [];
    var num = ['日', '一', '二', '三', '四', '五', '六'];
    for (x in num) {
        DayList.push(`星期${num[x]}`);
    }
    return DayList
}

/**
 * @name 获取小时列表
 */
function getHourList() {
    var hourList = [];
    for (var i = 0; i < 24; i++) {
        hourList.push(i);
    }
    return hourList
}

/**
 * @name 获取分钟列表
 */
function getMiniteList() {
    var miniteList = [];
    for (var i = 0; i < 60; i++) {
        miniteList.push(i);
    }
    return miniteList
}

/**
 * @name 获取秒数列表
 */
function getSecondList() {
    var secondList = [];
    for (var i = 0; i < 60; i++) {
        secondList.push(i);
    }
    return secondList
}

