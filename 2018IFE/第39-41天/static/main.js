/**
 * @file 入口
 */
var regionWrapper = document.getElementById('region-radio-wrapper');
var productWrapper = document.getElementById('product-radio-wrapper');
checkBoxEvent(regionWrapper);
checkBoxEvent(productWrapper);
// 根据hash 恢复选择
var hashArr = [...location.hash.replace('#', '')];
hashArr.forEach(item=>{
    document.getElementById(item).checked = true;
});

