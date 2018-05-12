function getAllListItem() {
    // 返回页面中所有li标签
    var liList = document.querySelectorAll("li");//注意此种方法返回的NodeList对象(节点的集合)
    return liList
}

function findAllHtmlSpanInOneSection(sectionId) {
    // 返回某个section下所有span中内容为HTML的span标签
    var targetList = [];
    //获取目标section下所有span标签 （#sectionId span）
    var spanList = document.querySelectorAll("#" + sectionId + " " + "span")
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
    //获取目标section下所有li标签下的所有span （#sectionId li span）
    var spanList = document.querySelectorAll("#" + sectionId + " " + "li" + " " + "span");
    //查找包含 spanCont 的标签
    for (var j = 0; j < spanList.length; j++) {
        if (spanList[j].innerHTML === spanCont) {
            targetList.push(spanList[j].parentNode);
        }
    }
    return targetList
}

function getActiveLinkContent(sectionId) {
    // 返回某个section下，class为active的链接中包含的文字内容 (#sectionId .active)
    // 获取链接标签 （#sectionId .active）
    var linkList = document.querySelectorAll("#" + sectionId + " " + ".active")
    var linkText = [];
    for (var i = 0; i < linkList.length; i++) {
        linkText.push(linkList[i].innerHTML);
    }
    return linkText
}
