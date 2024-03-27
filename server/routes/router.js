const express = require('express');
const route = express.Router();

const servieces = require('../servieces/render');
const controller = require('../controller/controller');


function isUserExist( req, res , next) {
  if(req.session.user){
    next();

  } else {

    res.redirect('/login');

  }
}


route.get('/login', servieces.LoginPage);
//Showing login form


/**
 * @description Root Rout
 * @method GET/
  */
route.get('/', isUserExist ,servieces.homeRoutes);

/**
 * @description add users
 * @method GET/add-user
  */


route.get('/add-user', isUserExist,servieces.add_user);

/**
 * @description add users
 * @method GET/update-user
  */

route.get('/update-user',  isUserExist,servieces.update_user);


//API 
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users:id',controller.update);
route.delete('/api/users:id',controller.delete);
route.post('/api/login',controller.loginPage);

  


module.exports = route