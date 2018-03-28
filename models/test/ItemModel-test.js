'use strict';

require('../../app');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = chai.expect;
let dbConfig = require('../../db.config');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
// Create a new schema that accepts a 'name' object.
const ItemSchema = require('../../schemas/itemSchema');
//Create a new collection called 'item'
const ItemModel = mongoose.model('inventory', ItemSchema);

describe('Test Item Model', function() {
	//Before starting the test, create a sandboxed database connection
	//Once a connection is established invoke done()
	before(function (done) {
		mongoose.connect(uri + dbName);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	
	describe('Model - Item actions', function() {
		it('find document with item param', function(done) {
			ItemModel.find({ item: 'journal'}, (err, resp) => {
				if(err) {throw err;}
				if(resp.length === 0) {throw new Error('No data!');}
				setTimeout(function(){
					expect(resp[0]._doc.item).to.equal('journal');
					expect(resp).to.be.an.instanceOf(Object);
					done();
				});
			});
			// ItemModel.find({item: "journal"}, function(err, doc) {
			// 	if(err) throw err;
			// 	if(doc.length === 0) throw new Error('No document.');
			// 	done();
			// });
		});
	});
	
	//After all tests are finished drop database and close connection
	after(function(done){
		mongoose.connection.close(done);
	});
});