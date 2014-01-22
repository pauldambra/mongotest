var mongo = require('mongodb');
var monk = require('monk');
var db = monk('192.168.0.31/bm');
var collection = db.get('testcollection');

var insert = function(index, callback) {
    var start = new Date();

    collection.insert({
        'test' : 'value',
        'index' : index
    }, function (err, doc) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            var end = new Date();
            callback(null, end - start);
        }
    });
};

var count = function(callback) {
    var collection = db.get('testcollection');
    // console.log(collection);
    // collection.find({},{},function(e,docs){
    //  console.log(e);
    //  console.log(docs);
    // });

    collection.count({}, function(err, count) {
        var countEnd = new Date();

        callback((insertEnd - start), (countEnd - insertEnd), count);
    });
};

module.exports = {
    insert: insert,
    count: count
};