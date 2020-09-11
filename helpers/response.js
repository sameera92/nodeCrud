const logger = require('./logger');

const messages = {
	invalid_url: {
		status: 404,
		code: 9001,
		message: "Invalid API URL"
	},
	parameter_missing: {
		status: 400,
		code: 9002,
		message: "Mandatory Parameter Missing"
	},
	server_error: {
		status: 500,
		code: 9003,
		message: "Something went wrong"
	},
	not_implemented: {
		status: 404,
		code: 9004,
		message: "Feature not implemented yet"
	},
	unauthorized: {
		status: 401,
		code: 9005,
		message: "You don't have permission"
	},
	failed_to_send_sms: {
		status: 400,
		code: 9006,
		message: "Failed to send SMS"
	},
	code_not_exists: {
		status: 200,
		code: 9007,
		message: "Login code not exists"
	},
	no_categories_found: {
		status: 200,
		code: 9008,
		message: "No categories found"
	},
	no_contestant_found: {
		status: 200,
		code: 9009,
		message: "No contestant found"
	},
	invalid_category: {
		status: 200,
		code: 9009,
		message: "Invalid category"
	},
	invalid_contestant: {
		status: 200,
		code: 9010,
		message: "Invalid contestant"
	},
	already_voted: {
		status: 200,
		code: 9011,
		message: "Already voted"
	},
	no_votes_from_this_user: {
		status: 200,
		code: 9012,
		message: "No votes from this user"
	},
	user_exists: {
		status: 200,
		code: 9013,
		message: "User exists"
	},
	failed_to_create_user: {
		status: 200,
		code: 9014,
		message: "Failed to create user"
	},
	invalid_user: {
		status: 200,
		code: 9015,
		message: "Invalid user"
	},
	invalid_crendientials: {
		status: 200,
		code: 9016,
		message: "Invalid  crendientials"
	},				
	invalid_contestant_or_cat: {
		status: 200,
		code: 9017,
		message: "Invalid contestant or catogery"
	},	
	failed_to_gen_reports: {
		status: 200,
		code: 9018,
		message: "Failed to generate report"
	},	
	no_data: {
		status: 200,
		code: 9019,
		message: "No data found"
	},	
	
	
};

const success = (req, res, data = null, friendly_message,count) => {
	const resp = {
		"status": true,
		"code": 0,
		"message": "Success",
		"friendly_message": "Success",
		"data": data,
		"recordsTotal":count
	};

	if (friendly_message) {
		resp.friendly_message = friendly_message;
	}

    logger.info(req.url, resp);
	res.status(200);
	res.json(resp);
	return;
};

const fail = (req, res, message, friendly_message, data) => {
	const resp = {
		"status": false,
		"code": message.code,
		"message": message.message,
		"friendly_message": message.message,
		"data": data || {}
	};

	if (friendly_message) {
		resp.friendly_message = friendly_message;
	}

    logger.error(req.url, resp);
	res.status(message.status);
	res.json(resp);
	return;
};

exports.success = success;
exports.fail = fail;
exports.message = messages;
