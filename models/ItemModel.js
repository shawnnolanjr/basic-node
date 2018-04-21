// const mongo = require('mongodb'); // @todo: use this to find documents by id.
const ItemSchema = require('../schemas/ItemSchema');
class Item {
	static CreateDocument(data, callback) {
		ItemSchema.create(data, function(err, resp){
			callback(err, resp);
		});
	};

	// @todo: change FindAllDocuments async to look like FindDocumentsByType
	static FindAllDocuments(callback) {
		let items = ItemSchema.find();
		items
			.then(function(resp){
				callback(resp);
			})
			.catch(function (err) {
				callback(err);
			});
	}

	static FindDocumentsByType(data, callback) {
		ItemSchema.findOne(data, function(err, resp){
			callback(err, resp);
		});
	}
}
module.exports = Item;
