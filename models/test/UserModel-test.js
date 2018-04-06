'use strict';
require('../../app');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const dbConfig = require('../../utils/db/config/db.config');
const UserModel = require('../UserModel');
let dbName = dbConfig.mongoConfigs.db.name;

describe('Test User Model', function () {
    describe('Model - User actions', function () {
        it('Should NOT create user', function (done) {
            let user = {email: 'asdfasdf@asdf.com'};
            UserModel.CreateUser(user, function (err, resp) {
                expect(err.errors).to.be.an.instanceOf(Object);
                done();
            });
        });
    });

    describe('asdf', function () {
        it('Should create user', function (done) {
            let user = {email: 'asdfasdf@asdf.com', password: 'pass01', passwordConf: 'pass01', username: 'asdf'};
            UserModel.CreateUser(user, function (err, resp) {
                if(err) { throw Error(err); }
                expect(resp).to.be.an.instanceOf(Object);
                done();
            });
        });
    });

    after(function(done){
	    delete mongoose.models.UserModel;
        mongoose.connection.db.dropDatabase(dbName, function(){
            mongoose.connection.close(done);
        });
    });
});