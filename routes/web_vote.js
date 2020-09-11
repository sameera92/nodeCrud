const response = require('../helpers/response');
const csvWriter = require('../helpers/csvWriter');
const WebVote = require('../models/web_vote');
const json2csv = require('json2csv').parse;
var fs = require('fs');

var web_vote = {
	voteByUser: (req, res) => {
		WebVote.getallVotesByUser(req.params.code, function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					response.success(req, res, result);
					return;
				} else {
					response.fail(req, res, response.message.no_votes_from_this_user);
					return;
				}
			}
		});
	},
	getTotVotes: (req, res) => {
		var catId = 0;
		if (req.params.cat_id) {
			catId = req.params.cat_id
		}
		WebVote.getTotVotes(catId, function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					response.success(req, res, result);
					return;
				} else {
					response.fail(req, res, response.message.no_data);
					return;
				}
			}
		});
	},
	get: (req, res) => {
		var catId = 0;
		var conId = 0;
		if (req.params.cat_id) {
			catId = req.params.cat_id
		}
		if (req.params.con_id) {
			conId = req.params.con_id
		}
		WebVote.gettot(catId, conId, function (err, total) {
			if (err) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				WebVote.get(catId, conId, req.params.offset, req.params.limit, function (error, result) {
					if (error) {
						response.fail(req, res, response.message.server_error, null, error);
						return;
					} else {
						if (result.length > 0) {
							response.success(req, res, { "count": total.length, "data": result });
							return;
						} else {
							response.fail(req, res, response.message.no_data);
							return;
						}
					}
				});
			}
		});

	},
	getTotVotesCsv: (req, res) => {
		var catId = 0;
		if (req.params.cat_id) {
			catId = req.params.cat_id
		}

		var fields = [{ id: "con_id", title: "Contestant ID" }, { id: 'con_name', title: 'Contestant Name' }, { id: 'cat_name', title: 'Category Name' }, { id: 'WebVotes', title: 'Web Votes' }, { id: 'SMSVotes', title: 'SMS Votes' }, { id: 'TotalVotes', title: 'Total Votes' }];
		var fileName = 'dashboardReport-' + new Date().getTime() + '.csv';
		var csvPath = process.env.TEMPCSVDIR + '/' + fileName;
		WebVote.getTotVotes(catId, function (error, result) {
			if (error) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				if (result.length > 0) {
					//console.log("result----->",result);
					csvWriter.writeCsv(csvPath, fields, result, function (response) {
						response.success(req, res, csvFile);
						return;
					});
				} else {
					response.fail(req, res, response.message.no_data);
					return;
				}
			}
		});
	},
	testpage: (req, res) => {

		var catId = 0;
		var conId = 0;
		if (req.params.cat_id) {
			catId = req.params.cat_id
		}
		if (req.params.con_id) {
			conId = req.params.con_id
		}
		WebVote.gettot(catId, conId, function (err, total) {
			if (err) {
				response.fail(req, res, response.message.server_error, null, error);
				return;
			} else {
				WebVote.get(catId, conId, req.query.start, req.query.length, function (error, result) {
					if (error) {
						response.fail(req, res, response.message.server_error, null, error);
						return;
					} else {
						if (result.length > 0) {
							response.success(req, res, result, null, total.length);
							return;
						} else {
							response.fail(req, res, response.message.no_data);
							return;
						}
					}
				});
			}
		});
	}
};

module.exports = web_vote;
