// const mongo = require('mongodb'); // @todo: use this to find documents by id.
const DbConnect = require('../utils/db/connect/db.conect');
const ItemSchema = require('../schemas/ItemSchema');

class Item {
	static CreateDocument(data, callback) {
		// @todo: need to encrypt password
		DbConnect.mongoConnect(function(){
			ItemSchema.create(data, function(err, resp){
				return callback(err, resp);
			});
		});
	};

	static FindAllDocuments(callback) {
		DbConnect.mongoConnect(function(){
			ItemSchema.find({}, function(err, items) {
				items.reduce(function(itemMap, item){
					return item._doc;
				});
				return callback(err, items);
			});
		});
	}

	static FindDocumentsByType(data, callback) {
		DbConnect.mongoConnect(function(){
			ItemSchema.findOne(data, function(err, resp){
				return callback(err, resp);
			});
		});
	}
}

module.exports = Item;
