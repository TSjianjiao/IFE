var arr1 = [43, 54, 4, -4, 84, 100, 58, 27, 140];

// 将上面数组分别按从大到小以及从小到大进行排序后在console中输出

var arr2 = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];

// 将上面数组分别按字母顺序a-z及z-a进行排序，在console中输出

var arr3 = [[10, 14], [16, 60], [7, 44], [26, 35], [22, 63]];

// 将上面的二维数组，按照每个元素中第二个数从大到小的顺序进行排序输出，输出结果应该为：

// [[22, 63], [16, 60], [7, 44], [26, 35], [10, 14]]

var arr4 = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];

// 将上面数组分别按元素对象的value值从小到大进行排序后输出

console.log('/******************从小到大********************* */');
console.log(arr1.sort());
console.log('/******************从大到大********************* */');
console.log(arr1.sort((a, b) => b - a));
console.log('/******************从a到z********************* */');
console.log(arr2.sort());
console.log('/******************从z到a********************* */');
console.log(arr2.sort(function (a, b) {
    if(a > b) {
        return -1
    }
    if (a < b ) {
        return 1;
      }
      return 0
    //   必须把三种情况写完。。
}));
console.log('/******************二维数组排序********************* */');
// 函数名暂时这么取着
function arr3Compare(a, b) {
    if(a[1] > b[1]) {
        return -1
    }
    else if (a[1] < b[1]) {
        return 1
    }
    return 0
}
console.log(arr3.sort(arr3Compare));
console.log('/******************对象排序********************* */');
function arr4Compare(a, b) {
    if(a.value > b.value) {
        return 1
    }
    else if (a.value < b.value) {
        return -1
    }
    return 0
}
console.log(arr4.sort(arr4Compare));