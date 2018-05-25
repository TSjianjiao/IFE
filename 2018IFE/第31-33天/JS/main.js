/**
 * @file 入口
 */
const form = require('./form');
var regionWrapper = document.getElementById('region-radio-wrapper');
var productWrapper = document.getElementById('product-radio-wrapper');
form.checkBoxEvent(regionWrapper);
form.checkBoxEvent(productWrapper);