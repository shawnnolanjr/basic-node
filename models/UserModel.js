let UserSchema = require('../schemas/UsersSchema');

class UserModel {
	static CreateUser(data, callback) {
        UserSchema.create(data, function(err, resp){
            callback(err, resp);
        });
	};
}

module.exports = UserModel;
