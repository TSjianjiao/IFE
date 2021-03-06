var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}
// 如上有一个用来存储学习成绩的对象，编写一个函数，将其转为如下的二维数组

// var scoreArray = [
//     ["Tony", 95, 79, 68],
//     ……
// ];

/**
 * 对象转数组
 * @param {object} obj 
 */
function objToArray(obj) {
    var scoreArray = [];
    for (x in obj) {
        // 个人成绩，定义在这里，实现每个人都是新数组
        var sigleArry = [];
        // 保存姓名 
        sigleArry.push(x);
        // 继续for in 找到科目 最后保存成绩
        for (k in obj[x]) {
            sigleArry.push(obj[x][k]);
        }
        // 把个人成绩push到汇总数组中
        scoreArray.push(sigleArry);
    }
    return scoreArray
}

console.log(objToArray(scoreObject));

var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];
// 如上有一个用来存储多级菜单数据的数组，编写一个函数，将其转为如下的对象

// var menuObject = {
//     "1": {
//         name: "Area1",
//         subMenu: {
//             "3": {
//                 name: "Area1-1"
//             },
//             "4": {
//                 name: "Area1-2",
//                 subMenu: {
//                     "7": {
//                         name: "Area1-2-3"
//                     }
//                 }
//             }
//         }
//     }
//     ……
// }

/**
 * 数组转对象
 * @param {array} array 
 */
function arrayToObj(array) {
    // 返回对象
    var menuObject  = {};
    // 初始直接父节点序号
    var parent = 1;
    // 看了半天，没有发现有什么规律，后来发现数组的每一项的最后一项，代表的是父节点的序号
    // 实现的很复杂，而且只能三级菜单，更多级菜单还得加判断，不能无限级。
    // 还有很多bug..只能说勉强实现了要求
    // 判断一层一层看...
    for (x in array) {
        // 构造第一级菜单判断
        if(array[x][2] === -1) {
            menuObject[array[x][0]] = {name: array[x][1]};
        }
        // 同级的时候
        else if (array[x][2] === parent) {
            // 更新parent序号
            parent = array[x][2];
            // 如果直接父节点不存在 因为查找对象中的值，只能一层一层往下找才能取到
            if (!(menuObject[parent])) {
                // 就再往上找祖宗 （只考虑了又三级菜单）
                // 然后判断父节点的subMenu有没有
                if(!(menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'])){
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'] = {};
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
                // 有就直接添加
                else {
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
            }
            //父节点存在就
            else {
                // 判断父节点有没有subMenu
                if (!(menuObject[parent]['subMenu'])) {
                    menuObject[parent]['subMenu'] = {};
                    menuObject[parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                    parent = array[x][2];
                }
                // 如果已经有subMenu 直接增加新值
                else {
                    menuObject[parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                    
                }
            }
        }
        // 不同级的时候
        else {
            // 更新parent序号
           parent = array[x][2];
           if (!(menuObject[parent])) {
                if(!(menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'])){
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'] = {};
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
                else {
                    menuObject[array[parent - 1][2]]['subMenu'][parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
           }
           else {
                if (!(menuObject[parent]['subMenu'])) {
                    menuObject[parent]['subMenu'] = {};
                    menuObject[parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
                else {
                    menuObject[parent]['subMenu'][array[x][0]] = {name: array[x][1]};
                }
           }

        }
    }
    return menuObject;
}
console.log('我的方法');
console.log(arrayToObj(menuArr));


/********************这个是杨浩麟的方法 感觉是最好的方法********************** */
// https://github.com/yeung66/ife-basic/blob/master/basic22-24/sort.html 在最后
// 主要用到的性质是  eg:obj1 = {1:obj2{}}
//                     如果对象obj2在其他地方更新了，更换了数据，obj1也自动更新
// obj整个的样子：
// 0:{1: {…}, 2: {…}}
// 1:{name: "Area1", subMenu: {…}}
// 2:{name: "Area2", subMenu: {…}}
// 3:{name: "Area1-1"}
// 4:{name: "Area1-2", subMenu: {…}}
// 5:{name: "Area2-1"}
// 6:{name: "Area2-2", subMenu: {…}}
// 7:{name: "Area1-2-3"}
// 8:{name: "Area2-2-1"}
// 比如 添加Area1-2-3：首先在obj保存节点Area1-2-3，数组中对应的是[7, "Area1-2-3", 4]，
// 因为所有的子节点父节点祖父节点等等都被单独保存在了0~8所以查找obj的时候不用一层一层找。
// Area1-2-3对应的父id是4，那么直接找obj[4]是否有subMenu，有就直接把Area1-2-3写入obj[4]['subMenu']
// 没有就创建一个obj[4]['subMenu'] = {},再写入。而且这样改变是时候obj[0]里面的对象也会改变。这样就完成了创建菜单

function arr2obj(arr){
    // 主目录的存放位置
    var obj = {0:{}};
    for(var i=0;i<arr.length;i++){
        // 保存节点，因为0已经用过了，所以后面就对应起来了eg:array[0] = [1, areal1, -1]
        //                                               obj{0:{}, 1:{name:areal1}....};
        obj[arr[i][0]]={'name':arr[i][1]};
        // 建立第一级
        if(arr[i][2]==-1){
            obj[0][arr[i][0]] = obj[arr[i][0]];
        }
        // 建立其他级
        else {
            // 判断父级有没有subMenu
            if(obj[arr[i][2]]['subMenu']) {
                obj[arr[i][2]]['subMenu'][arr[i][0]] = obj[arr[i][0]]; 
            }
            // 没有subMenu
            else {
                // 构造一个
                obj[arr[i][2]]['subMenu']={};
                obj[arr[i][2]]['subMenu'][arr[i][0]] = obj[arr[i][0]];
            }                   
        }
    }
    // 只返回键值0对应的值
    return obj['0']
    // 可以试试返回全部是什么样子
    // return obj
}
console.log('别人的方法');
console.log(arr2obj(menuArr));


/************这个是另外一种函数体的方法******* */
// function menuObject(arr, s) {
//     let obj = {};
//     for (let i = 0, len = arr.length; i < len; i++) {
//         let place = [], index = 0, o = obj;
//         // 获取子菜单级数，并且将父级链存放在place中
//         while ((index = arr[i][1].indexOf(s, index)) !== -1) {
//             place.push(arr[i][1].slice(0, index));
//             index += s.length;
//         }
//         // 找到菜单在链条中的位置并存放在o中
//         for (let i = 0, len = place.length; i < len; i++) {
//             for (let j in o) {
//                 if (o.hasOwnProperty(j)) {
//                     if (o[j].name === place[i]) {
//                         o[j].subMenu = o[j].subMenu || {};
//                         o = o[j].subMenu;
//                         break;
//                     }
//                 }
//             }
//         }
//         o[arr[i][0]] = {name: arr[i][1]};
//     }
//     return obj;
// }
// console.log(menuObject(menuArr, '-'));