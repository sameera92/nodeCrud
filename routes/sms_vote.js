const response = require('../helpers/response');
const smsVote = require('../models/sms_vote');

var sms_vote = {
    get: (req, res) => {
        var catId = 0;
        var conId = 0;
        // if (req.params.cat_id) {
        //     catId = req.params.cat_id
        // }
        // if (req.params.con_id) {
        //     conId = req.params.con_id
        // }
        smsVote.gettot(catId, conId, function (err, total) {
            if (err) {
                response.fail(req, res, response.message.server_error, null, err);
                return;
            } else {
                smsVote.get(catId, conId, req.query.start, req.query.length, function (error, result) {
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

module.exports = sms_vote;
