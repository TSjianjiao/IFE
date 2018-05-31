// function takeLongTime() {
//     return new Promise(resolve => {
//         setTimeout(() => resolve("long_time_value"), 1000);
//     });
// }

// async function test() {
//     const v = await takeLongTime();
//     console.log(v);
// }

// test();

var asyncFunc = function(arr, i) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            arr.push(i);
            console.log("index is : ", i);
            resolve();
        }, 1000);
    });
}
 
var box5 = async function() {
    var arr = [];
    for (var i = 0; i < 5; i++) {
        await asyncFunc(arr, i);
    }
    console.log(arr);
}
 
box5();

// function takeLongTime() {
//     return new Promise((resolve, reject) => {
//         var data = []

//         setTimeout(() => data.push(1), 1000);
//         resolve();
//     });
// }

// async function test() {
//     const v = await takeLongTime();
//     console.log(v);
// }

// test();