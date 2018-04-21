const CollectionSchema = require('../schemas/PasswordsSchema');
// @todo: maybe use bcrypt later.
// const bcrypt = require('../utils/content/bcrypt');
class PasswordModel {
	static CreatePassword(data, callback) {
		let pword = CollectionSchema.create(data);
		pword
			.then(function(resp){
				callback(resp);
			})
			.catch(function(err){
				callback(err);
			});
	};
	static GetPasswords(user, callback) {
		let collections = CollectionSchema.find();
		collections
			.then(function(resp){
				callback(resp);
			})
			.catch(function (err) {
				callback(err);
			});
	};
}
module.exports = PasswordModel;