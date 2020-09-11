var db = require('../helpers/db').pool;

var category = {
    get: function (next) {
        var query = "SELECT * FROM category";  
        var query_data = [];      
        db.query(query,query_data, next);
    },
    getById: function (id,next) {
        var query = "SELECT * FROM category WHERE id = ?";  
        var query_data = [id];      
        db.query(query,query_data, next);
    }    
};

module.exports = category;
