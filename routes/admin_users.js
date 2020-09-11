const Cryptr = require('cryptr');
const response = require('../helpers/response');
const AdminUsers = require('../models/admin_users');

const cryptr = new Cryptr(process.env.SECRET);

var admin_users = {
	create: (req, res) => {
        AdminUsers.get(req.body.username,function(err,user){
            if(err){
                response.fail(req, res, response.message.server_error, null, error);
                return;
            }else{
                if(user.length>0){
                    response.fail(req, res, response.message.user_exists);
                    return;
                }else{
                    const pass = cryptr.encrypt(req.body.password);
                    AdminUsers.write(req.body.username,pass, function (error, result) {
                        if (error) {
                            response.fail(req, res, response.message.server_error, null, error);
                            return;
                        } else {
                            response.success(req, res, "Admin user created");
                            return;
                        }			
                    });
                }
            }
        });
    },
	login: (req, res) => {        
        AdminUsers.get(req.body.username,function(err,user){
            if(err){
                response.fail(req, res, response.message.server_error, null, error);
                return;
            }else{
                if(user.length>0){                    
                    const decryptedString = cryptr.decrypt(user[0].password);                   
                    if(req.body.password == decryptedString){
                        response.success(req, res, {"userid":user[0].username});
                        return;
                    }else{
                        response.fail(req, res, response.message.invalid_crendientials);
                        return;
                    }
                }else{
                    response.fail(req, res, response.message.invalid_user);
                    return;                    
                }
            }
        });
    }    
};

module.exports = admin_users;