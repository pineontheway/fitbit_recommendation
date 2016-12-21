var express = require('express');
var router = express.Router();
var rs = require('request');


var classT="thin";
var results = [];
var info = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/spark', function(req, res, next) {
    classT = req.body;
    console.log(req.body);
    rs
      .get('http://1e7dbb9f.ngrok.io/recommend?user_id=21&status='+classT.class, function (err, res) {
          info = JSON.parse(res.body);
        console.log(JSON.parse(res.body));
        console.log(info);
        console.log(info.prodList[0]);
    });
    res.send("ok");
});

router.get('/prediction', function(req, res, next) {
  res.render('prediction', { title: 'Express' });
});

router.get('/recommendations', function(req, res, next) {
  res.render('recommendations', { title: 'Express' });
});

router.get('/getData', function(req, res, next) {
    var data = [
        ['Peak', 193],
        ['Burn', 117],
        ['Cardio', 151],
        ['Out Of Range', 64]
    ];
  res.send(data);
});

router.get('/getRegions', function(req, res, next) {
    var monthdata = [61.0,61.0,59.0,59.0,59.0,61.0,61.0,61.0,61.0,62.0,60.0,59.0,60.0,60.0,61.0,61.0,58.0,59.0,59.0,57.0,58.0,60.0,59.0,57.0,57.0,58.0,57.0,60.0,59.0,57.0];
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
  res.send({
      dates:months,
      monthData : monthdata
    });
});

router.get('/health', function(req, res, next) {
    var data = ['fat','healthy','thin'];
    console.log("34567");
    results =[];
    console.log("34567");
    console.log(classT);
    res.send(classT);
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/mysqldata', function(req, res, next) {
    req.getConnection(function(err,connection){
            var query = connection.query('SELECT title FROM testdb.products where product_id = ? or product_id = ? or product_id = ?',[info.prodList[0],info.prodList[1],info.prodList[2]],function(err,rows){
             if(err)
               console.log("Error Selecting : %s ",err );
               for (var i = 0; i < rows.length; i++) {
                 results.push(rows[i].title);
               }
               console.log(results);
               res.send(results);
          });

    });

});

module.exports = router;
