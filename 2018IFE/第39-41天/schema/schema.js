var mongoose = require('mongoose');

// 数据模板
var schema = mongoose.Schema;
var sale = new schema({
    product: {
        type:String,
        required:true
    },
    region: {
        type:String,
        required:true
    },
    sale: {
        type:Array,
        required:true
    } 
});

var saleModel = mongoose.model('Sale', sale);

module.exports = saleModel;

