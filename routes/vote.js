const moment = require('moment');
const request = require("request");
const response = require('../helpers/response');
const logger = require('../helpers/logger');
const contestant = require('../models/contestant');
const Category = require('../models/category');
const sms_vote = require('../models/sms_vote');
const sms_logs = require('../models/sms_logs');
const WebVote = require('../models/web_vote');
const reply_message = require('../models/reply_message');

const reply = (req, res, mobileNumber, message, isError = true) => {
	var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	sms_logs.write(currentTime, mobileNumber, req.query.message, message, function (err, result) {
		reply_message.get(message, function (err, result) {
			if (err) {
				response.fail(req, res, response.message.server_error, null, err);
				return;
			} else {
				if (result.length > 0) {
					var options = {
						method: 'GET',
						url: process.env.SMS_API,
						qs:
						{
							username: process.env.SMS_USERNAME,
							password: process.env.SMS_PASSWORD,
							from: process.env.SMS_FROM_NUMBER,
							to: mobileNumber,
							msg: result[0].value
						}
					};

					request(options, function (error, smsResponse, body) {
						if (error) {
							response.fail(req, res, response.message.failed_to_send_sms, null, error);
							return;
						} else {
							logger.debug("SMS Sent", { mobileNumber, message, body });
							if (isError) {
								response.fail(req, res, response.message.failed_to_send_sms, null, { msg: result[0].value });
								return;
							} else {
								response.success(req, res, 'Message Sent');
								return;
							}
						}
					});
				} else {
					response.fail(req, res, response.message.failed_to_send_sms);
					return;
				}
			}
		});
	});
}

const writeLogs = (req, res, code, message, formattedMsg, status, isError = true) => {
	var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
	sms_logs.write(currentTime, code, message, status, function (err, result) {
		if (err) {
			response.fail(req, res, response.message.server_error, null, err);
			return;
		} else {
			if (isError) {
				response.fail(req, res, formattedMsg, null, err);
				return;
			} else {
				if(status == 'SUGGESTION'){
					response.success(req, res, 'Your suggestion added');
					return;
				}else{
					response.success(req, res, 'Voted');
					return;
				}
			}
		}
	});
}

var vote = {
	receive_sms: (req, res) => {
		var status = '';
		var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

		var mobileNumber = req.query.mobilenumber;
		var message = req.query.message.trim();
		message = message.replace(/ {1,}/g, " ");
		var messageArray = message.split(' ');

		var keyword = messageArray[0].trim().toUpperCase();

		if (keyword == process.env.SMS_SHORT_CODE) {
			if (messageArray.length > 1) {
				var contestantId = parseInt(messageArray[1].trim());
				if (!isNaN(contestantId)) {
					contestant.get(contestantId, function (err, result) {
						if (err) {
							status = "DB_ERROR";
							reply(req, res, mobileNumber, status);
						} else {
							if (result.length > 0) {
								sms_vote.getByMobileCategory(mobileNumber, result[0].category_id, function (err, alredyExists) {
									if (err) {
										status = "DB_ERROR";
										reply(req, res, mobileNumber, status);
									} else {
										if (alredyExists.length > 0) {
											status = "ALREADY_EXISTS";
											reply(req, res, mobileNumber, status);
										} else {

											sms_vote.write(mobileNumber, result[0].category_id, contestantId, currentTime, function (err) {
												if (err) {
													status = "DB_ERROR";
													reply(req, res, mobileNumber, status);
												} else {
													status = "SUCCESS";
													reply(req, res, mobileNumber, status, false);
												}
											});
										}
									}
								});
							} else {
								status = "INVALID_MESSAGE"
								reply(req, res, mobileNumber, status);
							}
						}
					});
				} else {
					status = 'INVALID_CONTESTANT_ID'
					reply(req, res, mobileNumber, status);
				}
			} else {
				status = 'INVALID_CONTESTANT_ID'
				reply(req, res, mobileNumber, status);
			}
		} else {

			status = 'INVALID_SHORT_CODE'
			reply(req, res, mobileNumber, status);
		}
	},
	web_vote: (req, res) => {
		var currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
		if(req.body.suggestion == undefined){
			
			var voteDetail = 'catogery:' + req.body.cat_id + ' | contestent:' + req.body.contest_id + ' | code :' + req.body.code;
			Category.getById(req.body.cat_id, function (error, result) {
				if (error) {
					writeLogs(req, res, req.body.code, voteDetail, response.message.server_error, 'DB_ERROR', true);
				} else {
					if (result.length > 0) {
						contestant.get(req.body.contest_id, function (error, catResult) {
							if (error) {
								writeLogs(req, res, req.body.code, voteDetail, response.message.server_error, 'DB_ERROR', true);
							} else {
								if (catResult.length > 0) {
									//getContestentsByCat
									contestant.getContestentsByCat(req.body.cat_id,req.body.contest_id,function(error,conRes){
										if(error){
											writeLogs(req, res, req.body.code, voteDetail, response.message.server_error, 'DB_ERROR', true);
										}else{
											if(conRes.length>0){
												WebVote.getByCodeCategory(req.body.code, req.body.cat_id, function (error, voteResult) {
													if (error) {
														writeLogs(req, res, req.body.code, voteDetail, response.message.server_error, 'DB_ERROR', true);
													} else {
														if (voteResult.length > 0) {
															writeLogs(req, res, req.body.code, voteDetail, response.message.already_voted, 'ALREADY_VOTED', true);
														} else {
															WebVote.write(req.body.code, req.body.cat_id, req.body.contest_id, currentTime, function (err, writeRes) {
																if (err) {
																	writeLogs(req, res, req.body.code, voteDetail, response.message.server_error, 'DB_ERROR', true);
																} else {
																	writeLogs(req, res, req.body.code, voteDetail, null, "SUCCESS", false);
																}
															});
														}
													}
												});
											}else{
												writeLogs(req, res, req.body.code, voteDetail, response.message.invalid_contestant_or_cat, 'INVALID_CONTESTANT_OR_CATOGERY', true);
											}
										}
									});
								} else {
									writeLogs(req, res, req.body.code, voteDetail, response.message.invalid_contestant, 'INVALID_CONTESTANT', true);
								}
							}
						});
					} else {
						writeLogs(req, res, req.body.code, voteDetail, response.message.invalid_category, 'INVALID_CATEGORY', true);
					}
				}
			});
		}else{
			var voteDetail =  'suggestion :'+req.body.suggestion +' | code :' + req.body.code;
			writeLogs(req, res, req.body.code, voteDetail, null, 'SUGGESTION', false);
		}
	}
};

module.exports = vote;
