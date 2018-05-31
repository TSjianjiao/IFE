var mongoose = require('mongoose');
var saleModel = require('../schema/schema');
// 连接数据库
mongoose.connect('mongodb://localhost/ife');

/**
 * 增加数据
 * @param {object} input 
 */
function addData(input) {
    var data =  new saleModel(input);
    data.save((err)=>{if(err) console.log(err)});
}

/**
 * 查找数据
 * @param {object} condition 
 * @param {function} callback 
 */
function findData(condition, callback) {
    // 因为要取异步操作的数据，所以增加一个回调函数
    saleModel.findOne(condition, (err, ret)=>{
        if(err) callback(err, null);
        else callback(null, ret)
    })
}

/**
 * 删除数据
 * @param {object} condition 
 */
function deleteData(condition) {
    saleModel.remove(condition, (err)=>{if(err)console.log(err)});
}

/**
 * 更新数据
 * @param {object} condition 
 * @param {object} newdata 
 */
function update(condition, newdata) {
    saleModel.updateOne({_id:condition}, {$set:{'sale':newdata}}, (err)=>{if(err)console.log(err)});
}

module.exports = {
    addData,
    findData,
    deleteData,
    update
}
