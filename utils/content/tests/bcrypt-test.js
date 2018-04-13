'use strict';
require('../../../app');
const bcrypt = require('../bcrypt');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('Test Password Encryption', function() {
	describe('Encryption assertions', function(){
		it('Should encrypt password', function(done) {
			let someStr = 'somepassword';
			let safeUrl = bcrypt.encryptPassword(someStr);
			assert.notEqual(safeUrl, someStr, 'these numbers are not equal');
			done();
		});
		it('Should decrypt password', function(done) {
			let someStr = 'somepassword';
			let hash = bcrypt.encryptPassword(someStr);
			let safeUrl = bcrypt.decryptPassword(someStr,hash);
			expect(true).to.equal(safeUrl);
			done();
		});
	});
});