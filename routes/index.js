var express = require('express');
var router = express.Router();
const db = require('../database')

router.get('/', function (req, res) {
	let s = "SELECT * FROM biodata";
	let query = db.query(s, (err, results)=>{
		var data = {
			data:results
		}
		res.render('read', data);	
	});
	
});
router.get('/insert', function (req, res) {
	res.render('create');
});
router.get('/update', function (req, res) {
	let s = "SELECT * FROM biodata WHERE id ='"+req.query.i+"'";
	let query = db.query(s, (err, results)=>{
		var data = {
			data:results[0]
		}
		res.render('update', data);
	});
	
});

// Create
router.post("/add_person", function (req, res) {
    let data = {name: req.body.name, age: req.body.age};
    let sql = "INSERT INTO biodata SET ?";  
    let query = db.query(sql, data,(err, results) => {
       if (err) {
       		res.send({result:"error"});
       }else{
       		res.redirect("/");
       }
    });
});
// Delete
router.get("/delete_person", function (req, res) {
	 let sql = "DELETE FROM biodata WHERE id ='"+req.query.i+"'";  
    let query = db.query(sql, (err, results) => {
       if (err) {
       		res.send({result:"error"});
       }else{
       		res.redirect("/");
       }
    });
});
//Update
router.post("/update", function (req, res) {
	let data = {name: req.body.name, age: req.body.age};
    let sql = "UPDATE biodata SET ? WHERE id ='"+req.query.i+"'";  
    let query = db.query(sql, data,(err, results) => {
       if (err) {
       		console.log("error");
       		res.send({result:"error"});
       }else{
       		console.log("success");
       		res.redirect("/");
       }
    });	
})

module.exports = router;

