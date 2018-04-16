const DbConnect = require('../utils/db/connect/db.conect');
const UserSchema = require('../schemas/UsersSchema');
const bcrypt = require('../utils/content/bcrypt');
class UserModel {
	static CreateUser(data, callback) {
        DbConnect.mongoConnect(function(){
        	let userSchema = UserSchema.create(data);
	        userSchema
		        .then(function (resp) {
		        	callback(resp);
		        })
		        .catch(function (err) {
		        	callback(err);
		        });
        });
	};

	static Login(data, callback) {
		DbConnect.mongoConnect(function(){
			let userLogin = UserSchema.findOne({username: data.username});
			userLogin
				.then(function(resp){
					if(resp) {
						let password = (resp && resp._doc.password) ? resp._doc.password : null;
						let compare = bcrypt.decryptPassword(data.password, password);
						if(compare) {
							callback(resp);
						} else {
							callback('Incorrect password');
						}
					} else {
						callback('No Response')
					}
				})
				.catch(function (err) {
					callback(err);
				});
		});
	};
}
module.exports = UserModel;