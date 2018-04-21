'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const CollectionModel = require('../PasswordModel');
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
	describe('Password collection data', function() {
		it('Create pword', function(done){
			let password = {
				site: 'gmail',
				user: 'asdf@asdf.com',
				pword: 'asdf'
			};
			CollectionModel.CreatePassword(password, (resp) => {
				expect(resp._doc).to.be.an.instanceOf(Object);
				done();
			});
		});
		it('Find pwords', function(done) {
			let user = {
				"roles": [
					"Admin",
					"Super",
					"Normal"
				],
				"_id": "5ad5743f03160924e6eb6b26",
				"email": "asdf@asdf.com",
				"username": "asdf",
				"password": "$2a$10$fPt.N40YUq4JZSLcXvwyZumYqt0Wr3MnROnA.yKMgqU4qExmuMQbi",
				"createdDate": "2018-04-17T04:12:47.221Z",
				"__v": 0
			};
			CollectionModel.GetPasswords(user, (resp) => {
				expect(resp).to.have.lengthOf(1);
				done();
			})
		});
	});

    after(function(done){
	    mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
	    });
    });
});