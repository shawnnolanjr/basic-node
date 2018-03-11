let app = require('../../app');
let assert = require('assert');
let mongoose = require('mongoose');
let dbConfig = require('../../db.config');
let url = dbConfig.mongoConfigs.db.uri;
let dbName = dbConfig.mongoConfigs.db.name;
let dbCollection = dbConfig.mongoConfigs.db.collection;
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const testSchema = new Schema({
	name: { type: String, required: true }
});

//Create a new collection called 'Item'
const Item = mongoose.model('Item', testSchema);

describe('Testing mongodb', function() {
	before(function (done) {
		mongoose.connect(url + dbName);
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function() {
			console.log('We are connected to test database!');
			done();
		});
	});
	
	describe('Test Find Item', function() {
		it('Should retrieve data from inventory database', function(done) {
			//Look up the 'Mike' object previously saved.
			const collection = db.collection(dbCollection);
			Item.find({_id: '5a98c2b97cb6d9d891980dcf'}, (err, name) => {
				if(err) {throw err;}
				if(name.length === 0) {throw new Error('No data!');}
				done();
			});
		});
		//Save object with 'name' value of 'Mike"
		// it('New name saved to test database', function(done) {
		// 	let testName = Item({
		// 		name: 'Mike'
		// 	});
		//
		// 	testName.save(done);
		// });
		// it('Dont save incorrect format to database', function(done) {
		// 	//Attempt to save with wrong info. An error should trigger
		// 	let wrongSave = Item({
		// 		notName: 'Not Mike'
		// 	});
		// 	wrongSave.save(err => {
		// 		if(err) { return done(); }
		// 		throw new Error('Should generate error!');
		// 	});
		// });
		// it('Should retrieve data from test database', function(done) {
		// 	//Look up the 'Mike' object previously saved.
		// 	Item.find({name: 'Mike'}, (err, name) => {
		// 		if(err) {throw err;}
		// 		if(name.length === 0) {throw new Error('No data!');}
		// 		done();
		// 	});
		// });
	});
	
	//After all tests are finished drop database and close connection
	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			mongoose.connection.close(done);
		});
	});
});