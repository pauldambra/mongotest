var async = require('async');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('10.0.1.57/bm');
var collection = db.get('testcollection');
var insertTimes = [];
var levelOfConcurrency = 1;
var finishCallback = function() {
	console.log('did not set callback');
};

var calculateAverage = function(arr) {
	var sum = 0;
	for(var i = 0, len = arr.length; i < len; i++){
	    sum += arr[i];
	}
	return sum/arr.length;
};

var q = async.queue(function (task, done) {
    var index = task.index;
    var start = new Date();

    collection.insert({
        'test' : 'value',
        'index' : index
    }, function (err, doc) {
        if (err) {
            console.log(err);
            done(err);
        } else {
            var end = new Date();
            insertTimes.push(end - start);
				done();
        }
    });
}, levelOfConcurrency);

// assign a callback
q.drain = function() {
	console.log('with concurrency = ' + levelOfConcurrency);
	console.log(insertTimes.length + ' insertions completed');
	console.log('average milliseconds to insert is ' + calculateAverage(insertTimes));
    console.log('all items have been processed');
	finishCallback();
};

var queueCallback = function (err) {
	if (err) {
		console.log(err);
	}
};

// add some items to the queue
var aThousanddInserts = function(concurrency, callback) {
	levelOfConcurrency = concurrency || levelOfConcurrency;
	finishCallback = callback || finishCallback;

	collection.index('index', function() {});

	for(var i = 0; i < 6000; i++) {
		q.push({index: i}, queueCallback);
	}
};

module.exports = {
	runInsertTests : aThousanddInserts
};