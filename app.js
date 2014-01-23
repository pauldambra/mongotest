var testInserts = require('./testInserts');
var testFind = require('./testFind');
var async = require('async');

var concurrencySteps = [1,2,4,6,8,10];

var queueCallback = function (err) {
	if (err) {
		console.log(err);
	}
};

var insertQueue = async.queue(function(task, done) {
	console.log('using concurrency: '+task.concurrency);
	testInserts.runInsertTests(task.concurrency, done);
});

insertQueue.drain = function() {
	console.log('ran all queued insert tests');
};

for(var i = 0; i < 6; i ++) {
	var task = {concurrency: concurrencySteps[i]};
	console.log(task);
	insertQueue.push(task, queueCallback);
}

var findQueue = async.queue(function(task, done) {
	console.log('using concurrency: '+task.concurrency);
	testFind.runFindTests(task.concurrency, done);
});

findQueue.drain = function() {
	console.log('ran all queued find tests');
};

for(var i = 0; i < 6; i ++) {
	var task = {concurrency: concurrencySteps[i]};
	console.log(task);
	findQueue.push(task, queueCallback);
}


