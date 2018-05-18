/**
 * @file 编程任务3 主函数
 */


// 确定父元素 然后初始化选单
var parent = document.getElementsByTagName('body')[0];
initTimeSelect(parent);

// 默认值
// 默认年份 为初始化函数里面的设置的年份的第一年
var selectedYear = getYearList(10)[0];
var selectedMonth = 1;
var selectedDate = 1;
var selectedDay = '星期一';
var selectedHour = 0;
var selectedMinite = 0;
var selectedSecond = 0;
// 注册事件们
addELs();

// 更新计算>选择时间<和>当前时间<的差

setInterval(function () {
    // 更新
    DisplaytimeDifference();
}, 1000)




/**
 * @name 给所有的选单注册事件
 */
function addELs() {
    // 选中默认星期
    getWeek();
    // 给年选单注册事件 更新年份
    var yearSelect = document.getElementById('year-select');
    // 事件代理
    yearSelect.addEventListener('click', function (e) {
        var target = e.target;
        // 是点的选项
        if (target.nodeName === 'OPTION') {
            // 更新当前年份
            selectedYear = target.value;
        }
    });

    // 给月选单注册事件 不同月同时更新日期
    var monthSelect = document.getElementById('month-select');
    monthSelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedMonth = target.value;
            // 更新天数列表函数
            reflashDate(selectedYear, selectedMonth);
        }
    });

    // 给天数注册事件
    var dateSelect = document.getElementById('date-select');
    dateSelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedDate = target.value;
            // 更新星期
            getWeek();
        }
    });

    // 给星期注册事件
    var daySelect = document.getElementById('day-select');
    daySelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedDay = target.value;
            // 更新天
            getRecentDay(selectedDay);
        }
    });

    // 给小时注册事件
    var hourSelect = document.getElementById('hour-select');
    hourSelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedHour = target.value;
        }
    });

    // 给分钟注册事件
    var miniteSelect = document.getElementById('minite-select');
    miniteSelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedMinite = target.value;
        }
    });

    // 给秒注册事件
    var secondSelect = document.getElementById('second-select');
    secondSelect.addEventListener('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'OPTION') {
            selectedSecond = target.value;
        }
    });
}

/**
 * @name 初始化选单
 * @param {HTMLElement} parentElement 父元素对象
 */
function initTimeSelect (parentElement) {
    // 创建年份选单 20+1年
    var yearList = getYearList(10);
    var yearSelect = createSlect('year-select', 'year-select', yearList);
    parentElement.appendChild(yearSelect);
    // 创建月份选单
    var monthList = getMonthList();
    var monthSelect = createSlect('month-select', 'month-select', monthList);
    parentElement.appendChild(monthSelect);
    // 创建天数选单 默认是31天 年份随便写 天数是31就行 因为是初始化先不考虑变化
    var dateList = getDateList(2018, 1)
    var dateSelect = createSlect('date-select', 'date-select', dateList);
    parentElement.appendChild(dateSelect);
    // 创建星期选单
    var dayList = getDayList();
    var daySelect = createSlect('day-select', 'day-select', dayList);
    parentElement.appendChild(daySelect);
    // 创建小时选单
    var hourList = getHourList();
    var hourSelect = createSlect('hour-select', 'hour-select', hourList);
    parentElement.appendChild(hourSelect);
    // 创建分钟选单
    var miniteList = getMiniteList();
    var miniteSelect = createSlect('minite-select', 'minite-select', miniteList);
    parentElement.appendChild(miniteSelect);
    // 创建秒数选单
    var secondList = getSecondList();
    var secondSelect = createSlect('second-select', 'second-select', secondList);
    parentElement.appendChild(secondSelect);
    // 最后创建一个输出标签 方便演示
    var pObj = document.createElement('p');
    pObj.setAttribute('id', 'result-wrapper');
    parentElement.appendChild(pObj);
}

/**
 * @name 创建一个select对象
 * @param {string} idName 默认select
 * @param {string} className 默认select
 * @param {array} dataArr 数据数组一维的
 */
function createSlect(idName = 'select', className = 'select', dataArr) {
    // 创建空的select
    var selectObj = document.createElement('select');
    selectObj.setAttribute('id', idName);
    selectObj.setAttribute('class', className);
    // 创建选项
    for (x in dataArr) {
        // 创建空的option
        var optionObj = document.createElement('option');
        // 设置value值
        optionObj.setAttribute('value', dataArr[x]);
        optionObj.innerHTML = dataArr[x];
        // 加入select
        selectObj.appendChild(optionObj);
    }
    return selectObj
}


/**
 * @name 总天数更新
 * @param {number} year
 * @param {number} month 1~12
 */
function reflashDate(year, month) {
    // 天数的选单
    var dateSelect = document.getElementById('date-select');
    // 先删除所有天数选项 注意遍历删除子节点的时候要倒着来 因为序号会变
    var childLen = dateSelect.children.length;
    for (var i = childLen - 1; i >= 0; i--) {
        dateSelect.removeChild(dateSelect.children[i]);
    }
    // 获取新的天数列表
    var dateList = getDateList(year, month);
    // 这段和createSlect函数一样
    for (x in dateList) {
        // 创建空的option
        var optionObj = document.createElement('option');
        // 设置value值
        optionObj.setAttribute('value', dateList[x]);
        optionObj.innerHTML = dateList[x];
        // 加入select
        dateSelect.appendChild(optionObj);
    }

}


/**
 * @name 时间差显示
 * @param {array} current 一维
 */
function DisplaytimeDifference() {
    var resultObj = document.getElementById('result-wrapper');
    // 选择出来的月 日没有加0所以要加上
    var selectedList = [];
    selectedList.push(selectedYear, selectedMonth, selectedDate, 
                      selectedDay, selectedHour, selectedMinite, selectedSecond);
    addZero(selectedList);
    // 显示的格式
    var selectedStr = `${selectedList[0]}年
                       ${selectedList[1]}月
                       ${selectedList[2]}日&nbsp
                       ${selectedList[3]}&nbsp
                       ${selectedList[4]}:${selectedList[5]}:${selectedList[6]}`;
    
    // 以目前为起点 选择的时间为终点
    var diffArr = getTimeDifference();
    // 选择的时间在未来 用毫秒差作比较
    if (diffArr[4] <= 0) {
        // 小于0的时候特殊处理
        // 观察bug才发现要处理 什么原因不知道说 数学不好
        for (x in diffArr) {
            if (diffArr[x] < 0) {
                diffArr[x] = Math.abs(diffArr[x]) - 1;
            }
        }
        // 组合成结果字符串
        var resultStr = `${diffArr[0]}天${diffArr[1]}小时${diffArr[2]}分${diffArr[3]}秒`
        resultObj.innerHTML = `现在距离${selectedStr}&nbsp还有&nbsp${resultStr}`;
    }
    else {
        var resultStr = `${diffArr[0]}天${diffArr[1]}小时${diffArr[2]}分${diffArr[3]}秒`
        resultObj.innerHTML = `现在距离${selectedStr}&nbsp已经过去了&nbsp${resultStr}`;
    }

}

/**
 * 获取相差的天数，小时数，分钟，秒的列表
 */
function getTimeDifference() {
    var diffList = [];
    var now = new Date;
    var arr = `${selectedYear}/${selectedMonth}/${selectedDate} ${selectedHour}:${selectedMinite}:${selectedSecond}`;
    // 直接计算日期相差的毫秒数
    /***********!!!!!!!!!这里相当关键********************/
    // 如果开始和结果都单独开一个新的变量然后new一个date对象，给设定时间赋予值的时候会出现
    // 设置时间不正确的问题,虽然不知道为什么，但是通过下面这种方法设置第二个date正确了
    var timeDiff = now.getTime() - new Date(arr).getTime();
    //计算出相差天数  向下去整 不足一天不应直接进位
    var diffDays = Math.floor(timeDiff / (24 * 3600 * 1000));
    //计算出小时数 
    //计算天数后余下的毫秒数  
    var dayLeave = timeDiff % (24 * 3600 * 1000);    
    var diffHours = Math.floor(dayLeave / (3600 * 1000)); 
    //计算相差分钟数  
    var hourLeave = dayLeave % (3600 * 1000);
    var diffMinute = Math.floor(hourLeave / (60 * 1000));
    //计算相差秒数  
    var minuteLeave = hourLeave % (60 * 1000);
    var diffSeconds = Math.round(minuteLeave / 1000);
    // 返回数组 
    diffList.push(diffDays, diffHours, diffMinute, diffSeconds, timeDiff);
    return diffList
}

/**
 * 根据日期选中星期
 */
function getWeek() {
    // 有了年月日后就可以推算星期几了
    var daySelect = document.getElementById('day-select');
    var childList = daySelect.children;
    var dateStr = `${selectedYear}/${selectedMonth}/${selectedDate}`;
    // 先清理所有的selected
    for (var i = 0; i < childList.length; i++) {
        childList[i].removeAttribute('selected');
    }
    // 更新selectedDay
    var num = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = new Date(dateStr).getDay();
    selectedDay = num[day];
    // 用getday方法获取星期几，再选择第几项
    childList[day].setAttribute('selected', 'selected');
}

/**
 * 根据星期选中最近的一周的当天
 * @param {string} currentValue 当前opition的value
 */
function getRecentDay(currentValue) {
    // 根据当前选择的年月日获取基准星期
    var dateStr = `${selectedYear}/${selectedMonth}/${selectedDate}`;
    var currentWeek = new Date(dateStr).getDay();
    // 如果得到的星期值为0就赋值为7
    if (currentWeek === 0) {
        currentWeek += 7;
    }
    // 创建一个对象，给每个星期对上一个权重
    var valueObj = {};
    valueObj = {'星期一':1, '星期二':2, '星期三':3, '星期四':4, '星期五':5, '星期六':6, '星期日':7 };
    // 计算基准星期和选择的星期的差值，再加到之前选择的天数上，得到最近的天
    // selectedDate是字符串型的，要先转换
    var recentDay = Number(selectedDate) + (valueObj[currentValue] - currentWeek); 
    // 更新selectedDate
    selectedDate = recentDay;
    // 给对应的天数option添加selected
    var dateSelect = document.getElementById('date-select');
    var childList = dateSelect.children;
    // 先清理所有的selected
    for (var i = 0; i < childList.length; i++) {
        childList[i].removeAttribute('selected');
    }
    // 注意是recentDay - 1 childlist是从0开始的
    childList[recentDay - 1].setAttribute('selected', 'selected');
}