'use strict';

require('../../app');
let chai = require('chai');
let expect = chai.expect;
let UserModel = require('../UserModel');
// let UserSchema = require('../../schemas/UsersSchema');
// let User = db.model('User', UserSchema);

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
    describe('asdf', function(){
        it('Should create user', function (done) {
            let user = {email: 'asdfasdf@asdf.com', password: 'pass01', passwordConf: 'pass01', username: 'asdf'};
            UserModel.CreateUser(user, function (err, resp) {
                if(err) {throw err;}
                setTimeout(function(){
                    expect(resp).to.be.an.instanceOf(Object);
                    done();
                });
            });
        });
    });
});