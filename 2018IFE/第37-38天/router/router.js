var express = require('express');
var fs = require('fs');
var path = require('path');
var db = require('../DB/db')

var router = express.Router();

router.get('/', (req, res)=>{
    fs.readFile(path.join(__dirname, '../index.html'), (err, data)=>{
        if(err) return console.log(err)
        else res.send(data.toString());
    });
})

router.post('/data', (req, res)=>{
    db.findData(req.body, (err, ret)=>{
        if(err) console.log(err);
        else res.send(ret)
    });
})

router.post('/edit', (req,res)=>{
    console.log(req.body)
    db.update(req.body.condition, req.body.newdata);
});
module.exports = router;