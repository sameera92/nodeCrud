const response = require('../helpers/response');
const csvWriter = require('../helpers/csvWriter');
const SmsLogs = require('../models/sms_logs');
const json2csv = require('json2csv').parse;
var fs = require('fs');

var sms_logs = {

    get: (req, res) => {
        SmsLogs.gettot(function (err, total) {
            if (err) {
                response.fail(req, res, response.message.server_error, null, err);
                return;
            } else {
                SmsLogs.get(parseInt(req.query.length), parseInt(req.query.start), function (error, result) {
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

module.exports = sms_logs;