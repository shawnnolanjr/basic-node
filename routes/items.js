let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let dbConfig = require('../db.config');
let url = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
let results = [];

const findDocuments = function(db, callback) {
	const collection = db.collection('inventory');
	collection.find({}).toArray(function(err, docs) {
		callback(docs);
	});
};

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	let dbo = db.db(dbName);
	findDocuments(dbo, function(res) {
		results = res;
	});
});

/* GET items. */
router.get('/', function (req, res, next) {
	res.render('items', {content: 'respond with a resource', results: results});
});

module.exports = router;
