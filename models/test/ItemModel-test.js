'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const ItemModel = require('../ItemModel');
const strings = require('../../utils/content/strings');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = 'testDatabase';

describe('Test Item Model', function() {
	before(function (done) {
		mongoose.connect(uri + dbName);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	// @todo: create multiple docs.
	describe('Should create and find documents', function() {
		it('Create Document', function(done){
			let title = 'my document';
			let safeUrl = strings.convertTitlesToUrls(title);
			let data = {
				title: title,
				body: 'my body',
				url: safeUrl
			};
			ItemModel.CreateDocument(data, function(err, resp){
				if(err) throw Error(err);
				if(resp) done();
			});
		});
		it('Find documents', function(done) {
			let value = 'my document';
			ItemModel.FindDocumentsByType({'title': value}, function(err, resp) {
				if(err) throw Error(err);
				expect(resp).to.be.an.instanceOf(Object);
				done();
			});
		});
	});

	describe('Should NOT create document', function(){
		it('Create document', function(done){
			let data = {
				title: 'my document'
			};
			ItemModel.CreateDocument(data, function(err, resp){
				expect(err.errors).to.be.an.instanceOf(Object);
				done();
			});
		});
	});

    after(function(done){
	    mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
	    });
    });
});