var async = require('async');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('192.168.0.34/bm');
var collection = db.get('testcollection');

collection.count({}, function(err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result + ' records');
	}
})