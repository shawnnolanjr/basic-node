'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const ItemSchema = require('../ItemSchema');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;

describe('Test Item Schema', function() {
	before(function (done) {
		mongoose.connect(uri + 'testDatabase');
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});

	describe('one', function(){
		it('Should save Item to DB', function(done) {
			let testItem = {
				title: 'some title',
				body: 'some body'
			};
			ItemSchema.create(testItem, function(err, resp){
				if(err) throw Error(err);
				expect(resp.title).to.equal('some title');
				done();
			});
		});

		it('Should find Item from DB', function(done) {
			ItemSchema.find({ title: 'some title'}, (err, resp) => {
				if(err) { throw Error(err); }
				if(resp.length === 0) {throw Error('No data!');}
				expect(resp[0]._doc.title).to.equal('some title');
				expect(resp).to.be.an.instanceOf(Object);
				done();
			});
		});
	});
	
	describe('Schema - Item actions', function() {
		it('Should NOT save Item to DB', function(done) {
			let item = ItemSchema({ notName: 'Ryder' });
			ItemSchema.create(item, function(err, resp){
				if(!err) throw Error('Should NOT save item.');
				expect(err).to.be.an.instanceOf(Object);
				done();
			});
		});
	});
	
	after(function(done){
		delete mongoose.modelSchemas.ItemSchema;
		mongoose.connection.db.dropDatabase(dbName, function(){
			mongoose.connection.close(done);
		});
	});
});