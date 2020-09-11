var db = require('../helpers/db').pool;

var replyMessage = {
    get: function (key, next) {
        var query = "SELECT * FROM reply_messages WHERE `key` = ? ";
        var query_data = [key];
        db.query(query, query_data, next);
    }
};

module.exports = replyMessage;