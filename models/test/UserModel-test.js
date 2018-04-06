'use strict';

require('../../app');
let mongoose = require('mongoose');
let chai = require('chai');
let expect = chai.expect;
const UserModel = require('../UserModel');
let dbConfig = require('../../db.config');
let uri = dbConfig.mongoConfigs.db.uri;

describe('Test User Model', function () {
    before(function (done) {
        mongoose.connect(uri + 'testDatabase');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
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
    });

    describe('asdf', function(){
        it('Should create user', function (done) {
            let user = {email: 'asdfasdf@asdf.com', password: 'pass01', passwordConf: 'pass01', username: 'asdf'};
            UserModel.CreateUser(user, function (err, resp) {
                if(err) {throw err;}
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