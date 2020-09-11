var db = require('../helpers/db').pool;

var user = {
    get: function (code, next) {
        var query = "SELECT * FROM web_users WHERE code = ?";
        var query_data = [code];
        db.query(query, query_data, next);
    }
};

module.exports = user;
