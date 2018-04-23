let register = function(Handlebars) {
	let helpers = {
		userHelper: function(value) {
			return value;
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		return helpers;
	}

};
module.exports.register = register;
module.exports.helpers = register(null);