var db = require('../helpers/db').pool;

var contestant = {
    get: function (id, next) {
        var query = "SELECT * FROM contestant WHERE id = ?";
        var query_data = [id];
        db.query(query, query_data, next);
    },
    getAll: function (category_id, next) {
        var query = "SELECT * FROM contestant WHERE category_id = ?";
        var query_data = [category_id];
        db.query(query, query_data, next);
    },
    getContestentsByCat: function (category_id,id, next) {
        var query = "SELECT * FROM contestant WHERE category_id = ? AND id = ?";
        var query_data = [category_id,id];
        db.query(query, query_data, next);
    }    
};

module.exports = contestant;


