'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const UsersSchema = require('../../schemas/UsersSchema');
const bcrypt = require('../../utils/content/bcrypt');
let uri = dbConfig.mongoConfigs.db.uri;
let dbName = 'testDatabase';

describe('Test User Schema', function() {
	before(function (done) {
		mongoose.connect(uri + dbName);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			done();
		});
	});
	
	describe('Schema - User actions', function() {
		it('Should save new user', function(done) {
			let testItem = {
				email: 'test1@asdf.com',
				username: 'test1',
				password: bcrypt.encryptPassword('pass01'),
				createdDate: new Date()
			};
            UsersSchema.create(testItem, function(err, resp){
				if(err) throw Error(err);
				expect(resp).to.be.an.instanceOf(Object);
				done();
			});
		});
		
		it('Should NOT save user without password', function(done) {
			let testItem = {
				email: 'test1@asdf.com',
				username: 'test1'
			};
            UsersSchema.create(testItem, function(err, resp){
				if(!err.errors) throw Error('Password validation should NOT pass.');
				expect(err.errors.password.path).to.equal('password');
				expect(err.errors.password.message).to.equal('Path `password` is required.');
				done();
			});
		});
		// @Todo: change test to update password using mongoose to update a document.
		// @note: might not need this test.
		it('Should expect passwords to match', function(done) {
			let testItem = {
				email: 'test2@asdf.com',
				username: 'test2',
				password: 'pass01',
				passwordConf: 'wrongpassword'
			};
			expect(testItem.password).to.not.equal(testItem.passwordConf);
			testItem.passwordConf = 'pass01';
			expect(testItem.password).to.equal(testItem.passwordConf);
			done();
		});
		
		it('Should NOT save User to DB', function(done) {
			let wrongSave = { notName: 'Ryder' };
            UsersSchema.create(wrongSave, err => {
				if(err) { return done(); }
				throw new Error('Should generate error!');
			});
		});
		
		it('Should find User by email', function(done) {
			UsersSchema.find({ email: 'test1@asdf.com'}, (err, resp) => {
				if(err) {throw err;}
				if(resp.length === 0) { throw new Error('No data!'); }
				expect(resp[0]._doc.email).to.equal('test1@asdf.com');
				expect(resp).to.be.an.instanceOf(Object);
				done();
			});
		});

		it('Should find User by username', function(done) {
			UsersSchema.find({ username: 'test1'}, (err, resp) => {
				if(err) {throw err;}
				if(resp.length === 0) { throw new Error('No data!'); }
				expect(resp[0]._doc.email).to.equal('test1@asdf.com');
				expect(resp).to.be.an.instanceOf(Object);
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