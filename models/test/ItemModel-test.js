'use strict';

require('../../app');
let chai = require('chai');
let expect = chai.expect;
let itemModel = require('../ItemModel');

describe('Test Item Model', function() {
	describe('Item model actions', function(){
		it('Should get document by id', function(done) {
			itemModel.findDocument('5aa776fb9ebe5905c9646d40', function(err, resp) {
				if(err) throw new Error(err);
				expect(resp.item).to.equal('journal');
				done();
			});
		});
		it('Should get document by item type', function(done) {
			itemModel.findDocumentByItem('journal', function(err, resp) {
				if(err) throw new Error(err);
				expect(resp.item).to.equal('journal');
				done();
			});
		});
	});
});