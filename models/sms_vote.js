var db = require('../helpers/db').pool;

var sms_vote = {
    getByMobileCategory: function (mobile, catId, next) {
        var query = "SELECT * FROM sms_vote WHERE mobile_number = ? AND cat_id = ?";
        var query_data = [mobile, catId];
        db.query(query, query_data, next);
    },
    write: function (mobile, catId, contestId, logTime, next) {
        var query = "INSERT INTO sms_vote (mobile_number, cat_id, contest_id, date_time) VALUES (?, ?, ?, ?)";
        var query_data = [mobile, catId, contestId, logTime];
        db.query(query, query_data, next);
    },
    get: function (cat_id, con_id,offset,limit, next) {
        var query_data = [];
        var where = '';
        if ((cat_id != 0) && (con_id != 0)) {
            where = 'WHERE cat.id = ? AND c.id = ? ';
            query_data = [cat_id, con_id];
        } else {
            if (cat_id != 0) {
                where = 'WHERE cat.id = ? ';
                query_data = [cat_id];
            }
            if (con_id != 0) {
                where = 'WHERE c.id = ? ';
                query_data = [con_id];
            }
        }
        query_data.push(parseInt(limit));
        query_data.push(parseInt(offset));
        var query = "SELECT  sv.mobile_number AS mobile,cat.name AS category,cat.id AS cat_id,c.name AS con_name,c.id AS con_id,sv.date_time " +
            "FROM sms_vote sv INNER JOIN contestant c ON sv.contest_id = c.id " +
            "INNER JOIN category cat ON sv.cat_id = cat.id " + where + "LIMIT ? OFFSET ?";
        db.query(query, query_data, next);
    },
    gettot:function(cat_id, con_id,next){
        var query_data = [];
        var where = '';
        if ((cat_id != 0) && (con_id != 0)) {
            where = 'WHERE cat.id = ? AND c.id = ? ';
            query_data = [cat_id, con_id];
        } else {
            if (cat_id != 0) {
                where = 'WHERE cat.id = ? ';
                query_data = [cat_id];
            }
            if (con_id != 0) {
                where = 'WHERE c.id = ? ';
                query_data = [con_id];
            }
        }
        var query = "SELECT  sv.mobile_number AS mobile,cat.name AS category,cat.id AS cat_id,c.name AS con_name,c.id AS con_id,sv.date_time " +
            "FROM sms_vote sv INNER JOIN contestant c ON sv.contest_id = c.id " +
            "INNER JOIN category cat ON sv.cat_id = cat.id " + where ;
        db.query(query, query_data, next);        
    }
};

module.exports = sms_vote;
