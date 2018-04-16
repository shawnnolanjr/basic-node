'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
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

	describe('Model - Create user actions', function () {
		it('Should NOT create user', function (done) {
			let user = {email: 'asdfasdf@asdf.com'};
			UserModel.CreateUser(user, (err, resp) => {
				expect(err.errors).to.be.an.instanceOf(Object);
				assert.isNotObject(resp);
				done();
			});
		});

		it('Should create user', function (done) {
			let pword = 'pass01';
			let user = {email: 'asdf@asdf.com', password: bcrypt.encryptPassword(pword), username: 'asdf', createdDate: new Date()};
			UserModel.CreateUser(user, (data) => {
				expect(data).to.be.an.instanceOf(Object);
				done();
			});
		});
	});

	describe('Model - Login user actions', function(){
		it('Should log user in with correct password', function(done){
			let userData = { username: 'asdf', password: 'pass01' };
			UserModel.Login(userData, (err, resp) => {
				expect(resp._doc.username).to.equal(userData.username);
				assert.isObject(resp);
				done();
			});
		});

		it('Should fail login with incorrect password', function(done){
			let userData = { username: 'asdf', password: 'asdfasdf' };
			UserModel.Login(userData, (err, resp) => {
				expect(err).to.equal('incorrect password');
				assert.isNotObject(resp);
				done();
			});
		});

		it('Should fail login with incorrect username', function(done){
			let userData = { username: 'asdfasdf', password: 'pass01' };
			UserModel.Login(userData, (err, resp) => {
				expect(err).to.equal('No Response');
				assert.isNotObject(resp);
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