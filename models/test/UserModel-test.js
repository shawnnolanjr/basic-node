'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const UserModel = require('../UserModel');
const bcrypt = require('../../utils/content/bcrypt');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = 'testDatabase';

describe('Test User Model', function () {
	before(function (done) {
		mongoose.connect(uri + dbName);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function () {
			done();
		});
	});

	describe('Model - User actions', function () {
		it('Should NOT create user', function (done) {
			let user = {email: 'asdfasdf@asdf.com'};
			UserModel.CreateUser(user, function (err, resp) {
				expect(err.errors).to.be.an.instanceOf(Object);
				done();
			});
		});

		it('Should create user', function (done) {
			let pword = 'pass01';
			let encryptedPword = bcrypt.encryptPassword(pword);
			let user = {email: 'asdfasdf@asdf.com', password: encryptedPword, username: 'asdf', createdDate: new Date()};
			UserModel.CreateUser(user, function (err, resp) {
				if (err) throw Error(err);
				expect(resp).to.be.an.instanceOf(Object);
				done();
			});
		});
	});

	after(function (done) {
		mongoose.connection.db.dropDatabase(function(){
		   mongoose.connection.close(done);
		});
	});
});