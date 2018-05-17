/**
 * 
 * @file 编码任务3
 */

/*
实现一个字符串头尾去除空格的函数
注意需要去除的空格，包括全角、半角空格
暂时不需要学习和使用正则表达式的方式
*/
function diyTrim(str) {
    var result = "";
    // 将每个字符都分离 参数是空字符串
    var strList = str.split('');
    // 如果首字符是空格就一直shift
    while(strList[0] === ' ' || strList[0] === '　') {
        strList.shift();
    }
    // 如果末尾字符是空格就一直pop
    while(strList[strList.length - 1] === ' ' ||strList[strList.length - 1] === '　') {
        strList.pop();
    }
    // 最后将数组组合成字符串
    for (var i = 0; i < strList.length; i++) {
        result += strList[i];
    }
    return result
}

// 测试用例
// console.log(diyTrim(' a f b    ')); // ->a f b
// console.log(diyTrim('    ffdaf    ')); // ->ffdaf
// console.log(diyTrim('1    ')); // ->1
// console.log(diyTrim('　　f')); // ->f
// console.log(diyTrim('  　  a f b 　　 ')); // ->a f b
// console.log(diyTrim(' ')); // ->
// console.log(diyTrim('　')); // ->
// console.log(diyTrim('')); // ->

/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
    var result = "";
    // 去除首尾空格
    str = diyTrim(str);
    // 没有考虑去除重复空格..
    // 将每个字符都分开
    var strList = str.split('');
    var len = strList.length;
    // 每个字符都跟自己后面的字符比较，如果和后面的字符相等，就把后面的字符置为空字符串
    // 直到和后面的字符不相等，然后换下一个字符
    for (var i = 0; i < len; i++) {
        // 千万不能用i++，会改变i的值....
        var k = i+1;
        while(strList[i] === strList[k]) {
            strList[k] = '';
            k++;
        }
    }
    // 重组字符串
    for (var j = 0; j < len; j++) {
        result += strList[j];
    }
    return result;
}

// // 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc