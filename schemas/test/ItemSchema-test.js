'use strict';

require('../../app');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = chai.expect;
let dbConfig = require('../../db.config');
let uri = dbConfig.mongoConfigs.db.uri;
const ItemSchema = require('../../schemas/itemSchema');

describe('Test Item Schema', function() {
	before(function (done) {
		mongoose.connect(uri + 'testDatabase');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	
	describe('Schema - Item actions', function() {
		it('Should save Item to DB', function(done) {
			let testItem = ItemSchema({
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
		
		it('Should NOT save Item to DB', function(done) {
			let wrongSave = ItemSchema({ notName: 'Ryder' });
			wrongSave.save(err => {
				if(err) { return done(); }
				throw new Error('Should generate error!');
			});
		});
		
		it('Should find Item from DB', function(done) {
			ItemSchema.find({ item: 'journal'}, (err, resp) => {
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
	
	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			mongoose.connection.close(done);
		});
	});
});