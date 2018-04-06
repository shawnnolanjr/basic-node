// const mongo = require('mongodb'); // @todo: use this to find documents by id.
const DbConnect = require('../utils/db/connect/db.conect');
const ItemSchema = require('../schemas/ItemSchema');

class Item {
	static CreateDocument(data, callback) {
		// @todo: need to encrypt password
		DbConnect.mongoConnect(function(){
			ItemSchema.create(data, function(err, resp){
				callback(err, resp);
			});
		});
	};

	static FindDocumentsByType(data, callback) {
		DbConnect.mongoConnect(function(){
			ItemSchema.find(data, function(err, resp){
				callback(err, resp);
			});
		});
	}
}

module.exports = Item;
