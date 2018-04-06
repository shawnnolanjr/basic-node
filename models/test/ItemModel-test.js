'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const ItemModel = require('../ItemModel');
let dbName = dbConfig.mongoConfigs.db.name;

describe('Test Item Model', function() {
	// @todo: create multiple docs.
	describe('Should create and find documents', function() {
		it('Create Document', function(done){
			let data = {
				title: 'my document',
				body: 'my body'
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
	    delete mongoose.models.ItemModel;
        mongoose.connection.db.dropDatabase(dbName, function(){
            mongoose.connection.close(done);
        });
    });
});