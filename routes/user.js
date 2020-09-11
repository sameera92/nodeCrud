const response = require('../helpers/response');
const WebUser = require('../models/user');

var user = {
	login: (req, res) => {
		WebUser.get(req.body.userId, function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					response.success(req, res, {userId:result[0].code},'Login Success');
					return;
				} else {
					response.fail(req, res, response.message.code_not_exists);
					return;
				}
			}			
		});
	},
	profile: (req, res) => {
		console.log("profile---->");
		response.fail(req, res, response.message.not_implemented);
		return;
	}
};

module.exports = user;
