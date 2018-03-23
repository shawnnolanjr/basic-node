"use strict";

require('../../app');
let mongoose = require('mongoose');
let mongo = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let chai = require('chai');
let expect = chai.expect;
let dbConfig = require('../../db.config');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
let dbCollection = dbConfig.mongoConfigs.db.collection;
let ItemModel = require('../ItemModel');
// Create a new schema that accepts a 'name' object.
const testInventory = require('../../schemas/itemSchema');
//Create a new collection called 'item'
const item = mongoose.model('item', testInventory);
let collection;

describe('Test item model', function() {
	//Before starting the test, create a sandboxed database connection
	//Once a connection is established invoke done()
	before(function (done) {
		// MongoClient.connect(uri, function (err, db) {
		// 	if (err) throw err;
		// 	let dbo = db.db(dbName);
		// 	collection = dbo.collection(dbCollection);
		// 	done(err, collection);
		// });
		mongoose.connect(uri + dbName);
		const db = mongoose.connection;
		let dbo = db.name;
		collection = dbo.collection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	
	describe('test item actions', function() {
		it('Should get find item with param', function(done) {
			// expect('a', 'a', 'not right');
			// done();
			item.find({item: 'journal'}, function(err, docs){
				if(err) throw err;
				done();
			});
		});
	});
	
	//After all tests are finished drop database and close connection
	after(function(done){
		// MongoClient.close(done);
		mongoose.connection.close(done);
	});
});