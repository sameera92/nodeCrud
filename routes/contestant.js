const response = require('../helpers/response');
const Category = require('../models/category');
const Contestant = require('../models/contestant');

var contestant = {
	getByCategory: (req, res) => {        
		Contestant.getAll(req.params.cat_id,function (error, result) {            
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {            
				if (result.length > 0) {
					response.success(req, res, result);
					return;
				} else {
					response.fail(req, res, response.message.no_contestant_found);
					return;
				}
			}			
		});
	}
};

module.exports = contestant;
