function getAllListItem() {
    // 返回页面中所有li标签
    var liList = document.getElementsByTagName("li");
    console.log(liList);
    return liList
}

function findAllHtmlSpanInOneSection(sectionId) {
    // 返回某个section下所有span中内容为HTML的span标签
    var targetList = [];
    var sectionObj = document.getElementById(sectionId); //获取section对象
    var spanList = sectionObj.getElementsByTagName("span");//获取目标section下所有span标签
    // 查找包含"HTML"的标签
    for (var i = 0; i < spanList.length; i++) {
        if (spanList[i].innerHTML === "HTML") {
            targetList.push(spanList[i]);
        }
    }
    return targetList
}

function findListItem(sectionId, spanCont) {
    // 返回某个section下，所有所包含span内容为spanCont的LI标签
    var targetList = [];
    var sectionObj = document.getElementById(sectionId); //获取section对象
    var liList = sectionObj.getElementsByTagName("li");//获取目标section下所有li标签
    var spanList = [];//目标li下所有span标签
    //查找包含 spanCont 的标签
    for (var i = 0; i < liList.length; i++) {
        //获取span标签列表,注意的是spanlist首先是一个数组，其次数组中的每一项是一个HTMLCollection对象(元素节点的集合)
        //所以要取每个数组项（也就是每个HTMLCollection对象）的第一位值才是span标签对象
        spanList.push(liList[i].getElementsByTagName("span"));
    }
    for (var j = 0; j < spanList.length; j++) {
        if (spanList[j][0].innerHTML === spanCont) {
            targetList.push(spanList[j][0].parentNode);//别返回错了....
        }
    }
    return targetList
}

function getActiveLinkContent(sectionId) {
    // 返回某个section下，class为active的链接中包含的文字内容
    var sectionObj = document.getElementById(sectionId); //获取section对象
    //链接的HTMLCollection集合,不同于上面函数的spanList
    var linkList = sectionObj.getElementsByClassName("active");
    var linkText = [];
    for (var i = 0; i < linkList.length; i++) {
        linkText.push(linkList[i].innerHTML);
    }
    return linkText
}