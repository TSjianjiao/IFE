/**
 * @file 编码任务4
 */
var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}
var dlrList = [];
var ldrList = [];
var lrdList = [];
// 假设id和name均不会重复，根据输入name找到对应的id
function findIdByName(name) {
    var id;
    // 用的后面的遍历 前序
    function dlr(node) {
        if(node != null) {
            // 只有名字相同的时候才保存节点id
            if(node.name === name) {
                id = node.id;
            }
            dlr(node.left);
            dlr(node.right);
        }
    }
    dlr(tree);
    return id;
}

// 假设id和name均不会重复，根据输入id找到对应的name
function findNameById(id) {
    var name;
    // 用的后面的遍历 前序
    function dlr(node) {
        if(node != null) {
            // 只有id相同的时候才保存节点id
            if(node.id === id) {
                name = node.name;
            }
            dlr(node.left);
            dlr(node.right);
        }
    }
    dlr(tree);
    return name;
}

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR() {
    // 迭代，前序遍历，先保存节点再遍历左孩子，最后右孩子
    function dlr(node) {
        if(node != null) {
            dlrList.push(node.name);
            dlr(node.left);
            dlr(node.right);
        }
    }
    dlr(tree);
    console.log(dlrList);
}

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR() {
    // 迭代，中序遍历，先遍历左孩子，再保存节点，最后右孩子
    function ldr(node) {
        if(node != null) {
            ldr(node.left);
            ldrList.push(node.name);
            ldr(node.right);
        }
    }
    ldr(tree);
    console.log(ldrList);
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD() {
    // 迭代，后序遍历，先遍历左孩子，再右孩子，最后保存节点
    function lrd(node) {
        if(node != null) {
            lrd(node.left);
            lrd(node.right);
            lrdList.push(node.name);
        }
    }
    lrd(tree);
    console.log(lrdList);
}
console.log("*****************************前序遍历*****************************")
getListWithDLR();
console.log("*****************************中序遍历*****************************")
getListWithLDR();
console.log("*****************************后序遍历*****************************")
getListWithLRD();
console.log("*****************************通过名字找id*****************************")
console.log(findIdByName('Tony'));
console.log("*****************************通过id找名字*****************************")
console.log(findNameById(4));