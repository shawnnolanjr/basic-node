'use strict';
require('../../../app');
const strings = require('../strings');
const chai = require('chai');
const expect = chai.expect;

describe('Test Content Strings', function() {
	describe('Should convert string to friendly url', function(){
		it('simple space convert', function(done) {
			let someStr = 'test url';
			let safeUrl = strings.convertTitlesToUrls(someStr);
			expect(safeUrl).to.equal('test-url');
			done();
		});
		it('simple character test', function(done) {
			let someStr = 'test url *** ^--- something';
			let safeUrl = strings.convertTitlesToUrls(someStr);
			expect(safeUrl).to.equal('test-url------something');
			done();
		});
	});
	describe('Should convert to uppercase', function(){
		it('Should convert each word in string to uppercase', function(done) {
			let someStr = 'this is my test string';
			let safeUrl = strings.convertCase(someStr);
			expect(safeUrl).to.equal('This Is My Test String');
			expect(safeUrl).to.not.equal('this is my test string');
			done();
		});
	});
});