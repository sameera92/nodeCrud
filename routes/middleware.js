const response = require('../helpers/response');
const WebUser = require('../models/user');
const AdminUsers = require('../models/admin_users');

const middleware = {
    auth: (req, res, next) => {
        var accessToken = req.headers['accesstoken'];
        WebUser.get(accessToken, function (error, result) {
            if (error) {
                response.fail(req, res, response.message.server_error, null, error);
                return;
            } else {
                if (result.length > 0) {
                    next();
                } else {
                    response.fail(req, res, response.message.unauthorized);
                    return;
                }
            }
        });
    },
    adminauth: (req, res, next) => {
        var userId = req.headers['userid'];
        AdminUsers.get(userId, function (error, result) {
            if (error) {
                response.fail(req, res, response.message.server_error, null, error);
                return;
            } else {
                if (result.length > 0) {
                    next();
                } else {
                    response.fail(req, res, response.message.unauthorized);
                    return;
                }
            }
        });
    },
    check: (req, res, next) => {
        console.log('next called');
        next();
    }
};

module.exports = middleware;
