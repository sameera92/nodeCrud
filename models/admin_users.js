var db = require('../helpers/db').pool;

var admin_users = {
    get:function(username,next){
        var query = "SELECT * FROM admin_users WHERE username = ?";
        var query_data = [username];
        db.query(query, query_data, next);
    },
    write: function (username,password, next) {
        var query = "INSERT INTO admin_users (username, password) VALUES (?, ?)";
        var query_data = [username,password];
        db.query(query, query_data, next);
    }
};

module.exports = admin_users;