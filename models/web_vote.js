var db = require('../helpers/db').pool;

var web_vote = {
    getByCodeCategory: function (code, catId, next) {
        var query = "SELECT * FROM web_vote WHERE code = ? AND cat_id = ?";
        var query_data = [code, catId];
        db.query(query, query_data, next);
    },
    write: function (code, catId, contestId, logTime, next) {
        var query = "INSERT INTO web_vote (code, cat_id, contest_id, date_time) VALUES (?, ?, ?, ?)";
        var query_data = [code, catId, contestId, logTime];
        db.query(query, query_data, next);
    },
    getallVotesByUser: function (code, next) {
        var query = "SELECT wv.`code`, wv.cat_id, wv.contest_id, wv.date_time AS voted_time FROM web_vote AS wv  INNER JOIN category AS cat ON  wv.cat_id  = cat.id WHERE wv.`code` = ?;";
        var query_data = [code];
        db.query(query, query_data, next);
    },
    getTotVotes: function (cat_id,next) {
        
        var query_data = [];
        var where ='';
        if(cat_id != 0){
            where = ' WHERE t.id = ?';
            query_data.push(cat_id);
        }

       var query = "SELECT c.id AS con_id,c.name AS con_name,t.id AS cat_id,t.name AS cat_name,WebVotes,SMSVotes,(ifnull(WebVotes,0)  +ifnull(SMSVotes,0)) AS TotalVotes " +
        "FROM contestant c LEFT JOIN category t ON c.category_id = t.id LEFT JOIN " +
        "(SELECT  contest_id, COUNT(*)  AS 'WebVotes' FROM web_vote GROUP BY contest_id) wv ON c.id = wv.contest_id " +
        "LEFT JOIN (SELECT  contest_id, COUNT(*) AS 'SMSVotes' FROM sms_vote GROUP BY contest_id) sv ON c.id = sv.contest_id "+where +"ORDER BY c.id ASC";
        
        db.query(query, query_data, next);
    },
    getTotVotesCsv: function (cat_id,next) {
        
        var query_data = [];
        var where ='';
        if(cat_id != 0){
            where = ' WHERE t.id = ?';
            query_data.push(cat_id);
        }

       var query = "SELECT c.id AS con_id,c.name AS ContestantName,t.id AS CategoryID,t.name AS CategoryName,WebVotes,SMSVotes,(ifnull(WebVotes,0)  +ifnull(SMSVotes,0)) AS TotalVotes " +
        "FROM contestant c LEFT JOIN category t ON c.category_id = t.id LEFT JOIN " +
        "(SELECT  contest_id, COUNT(*)  AS 'WebVotes' FROM web_vote GROUP BY contest_id) wv ON c.id = wv.contest_id " +
        "LEFT JOIN (SELECT  contest_id, COUNT(*) AS 'SMSVotes' FROM sms_vote GROUP BY contest_id) sv ON c.id = sv.contest_id  "+ where +"ORDER BY c.id ASC";
        
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
        var query = "SELECT wv.code AS userCode,cat.name AS category,cat.id AS cat_id,c.name AS con_name,c.id AS con_id,wv.date_time "+
        "FROM web_vote AS wv INNER JOIN contestant c ON wv.contest_id = c.id "+
        "INNER JOIN category cat ON wv.cat_id = cat.id "+ where + "LIMIT ? OFFSET ?";
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

        var query = "SELECT wv.code AS userCode,cat.name AS category,cat.id AS cat_id,c.name AS con_name,c.id AS con_id,wv.date_time "+
                    "FROM web_vote AS wv INNER JOIN contestant c ON wv.contest_id = c.id "+
                    "INNER JOIN category cat ON wv.cat_id = cat.id "+ where;
        db.query(query, query_data, next);        
    }    

};

module.exports = web_vote;
