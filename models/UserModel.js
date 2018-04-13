const DbConnect = require('../utils/db/connect/db.conect');
const UserSchema = require('../schemas/UsersSchema');
const bcrypt = require('../utils/content/bcrypt');
let compare, password;
class UserModel {
	static CreateUser(data, callback) {
        DbConnect.mongoConnect(function(){
            UserSchema.create(data, function(err, resp){
                callback(err, resp);
            });
        });
	};

	static Login(data, callback) {
		DbConnect.mongoConnect(function(){
			// @todo: need to user a different schema that doesn't pull back password in object.
			UserSchema.findOne({username: data.username}, function(err, resp){
				password = (resp && resp._doc.password) ? resp._doc.password : null;
				if(!resp) {
					err = 'No Response';
					resp = null;
				}
				if(resp && password) {
					compare = bcrypt.decryptPassword(data.password, password);
				}
				if(!compare && (resp && password)) {
					err = 'incorrect password';
					resp = null;
				}
				callback(err, resp);
			});
		});
	};
}
module.exports = UserModel;