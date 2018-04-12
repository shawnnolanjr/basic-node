const DbConnect = require('../utils/db/connect/db.conect');
const UserSchema = require('../schemas/UsersSchema');

class UserModel {
	static CreateUser(data, callback) {
	    // @todo: need to encrypt password
        DbConnect.mongoConnect(function(){
            UserSchema.create(data, function(err, resp){
                callback(err, resp);
            });
        });
	};
}

module.exports = UserModel;