var insertAndCount = require('./insertAndCount');
var async = require('async');

var insertTimes = [];

var calculateAverage = function(arr) {
	var sum = 0;
	for(var i = 0, len = arr.length; i < len; i++){
	    sum += arr[i];
	}
	return sum/arr.length;
}

var q = async.queue(function (task, done) {
    var index = task.index;
	console.log('starting async test: ' + index);
	insertAndCount.insert(
		index, 
		function(err, insertTime) {
			if (err) {
				done(err);
			} else {
				console.log(insertTime);
				insertTimes.push(insertTime);
				done();
			}
		}
	);
}, 10);


// assign a callback
q.drain = function() {
	console.log(insertTimes.length + ' insertions completed');
	console.log('average milliseconds to insert is ' + calculateAverage(insertTimes));
    console.log('all items have been processed');
}

// add some items to the queue

for(var i = 0; i < 1000; i++) {
	q.push(
		{index: i}, 
		function (err) {
    		if (err) {
    			console.log(err);
    		}
		});
};

// var asyncTasks = [];
// 
// var countTimes = [];



// for(var i = 0; i < 10000; i++) {
// 	asyncTasks.push(function(callback) {
// 		var index = i;
// 		console.log('starting async test: ' + index);
// 		insertAndCount.insert(index, function(resultIndex, insertTime) {
// 			insertTimes.push(insertTime);
// 			console.log('completed insert ' + resultIndex);
// 		});
// 		callback(null, index);
// 	});
// };

// // Execute all async tasks in the asyncTasks array
// async.series(asyncTasks, function(){
//   // All tasks are done now
//   console.log('all tasks complete');
//   
//   //console.log('average to COUNT is ' + calculateAverage(countTimes));
// });