var db = require('../helpers/db').pool;

var sms_logs = {
    write: function (date_time, mobile, message, status, next) {
        var query = "INSERT INTO sms_log (date_time, mobile_number, message, status) VALUES (?, ?, ?, ?)";
        var query_data = [date_time, mobile, message, status];
        db.query(query, query_data, next);
    },
    get: function (limit, offset, next) {
        var query = "select * from sms_log where `status` IN('SUGGESTION','INVALID_CONTESTANT_ID') LIMIT ? OFFSET ?";
        var query_data = [limit, offset];
        db.query(query, query_data, next);
    },
    gettot: function ( next) {
        var query = "select * from sms_log where `status` IN('SUGGESTION','INVALID_CONTESTANT_ID')";
        var query_data = [];
        db.query(query, query_data, next);
    }    
};

module.exports = sms_logs;
