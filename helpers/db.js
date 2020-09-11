var mysql = require('mysql');
var logger = require("./logger");

var mysql_pool = mysql.createPool({
	connectionLimit: process.env.DB_POOL_SIZE,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	debug: false
});

const pool = {
	query: function (query, query_data, next) {
		query = mysql.format(query, query_data);
		if(process.env.LOG_MODE == "debug"){
			logger.debug("DB Query", query);
        }
		
		mysql_pool.query(query, function(err, data){
			if(err){
				logger.error("DB Error", {query, err});
			}

			if(next){
				next(err, data);
			}			
		});
	}
}

exports.pool = pool;
