const response = require('../helpers/response');
const Category = require('../models/category');

var category = {
	get: (req, res) => {
		Category.get(function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					response.success(req, res, result);
					return;
				} else {
					response.fail(req, res, response.message.no_categories_found);
					return;
				}
			}
		});
	},
	getById: (req, res) => {
		Category.getById(req.params.id, function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					response.success(req, res, result[0]);
					return;
				} else {
					response.fail(req, res, response.message.no_categories_found);
					return;
				}
			}
		});
	}
};

module.exports = category;
