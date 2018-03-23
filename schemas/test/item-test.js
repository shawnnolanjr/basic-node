"use strict";

require('../../app');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = chai.expect;
let dbConfig = require('../../db.config');
let uri = dbConfig.mongoConfigs.db.uri;
// Create a new schema that accepts a 'name' object.
const testInventory = require('../../schemas/itemSchema');
//Create a new collection called 'item'
const item = mongoose.model('item', testInventory);

describe('Test item model', function() {
	//Before starting the test, create a sandboxed database connection
	//Once a connection is established invoke done()
	before(function (done) {
		mongoose.connect(uri + 'testDatabase');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	
	describe('test item actions', function() {
		//Save object with required params
		it('Save new item to db', function(done) {
			let testItem = item({
				item: 'journal',
				qty: 25,
				status: 'A',
				size: {
					"h" : 14,
					"w" : 21,
					"uom" : "cm"
				}
			});
			testItem.save(done);
		});
		
		it('Should NOT save to db with incorrect data and params', function(done) {
			//Attempt to save with wrong info. An error should trigger
			let wrongSave = item({ notName: 'Ryder' });
			wrongSave.save(err => {
				if(err) { return done(); }
				throw new Error('Should generate error!');
			});
		});
		
		it('Should get find item with param', function(done) {
			item.find({ item: 'journal'}, (err, resp) => {
				if(err) {throw err;}
				if(resp.length === 0) {throw new Error('No data!');}
				setTimeout(function(){
					expect(resp[0]._doc.item).to.equal('journal');
					expect(resp).to.be.an.instanceOf(Object);
					done();
				});
			});
		});
	});
	
	//After all tests are finished drop database and close connection
	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			mongoose.connection.close(done);
		});
	});
});