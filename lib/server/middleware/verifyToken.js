const TokenController = global.require('controllers/TokenController');

module.exports = function(req, res, next) {
  const { body, query, headers } = req;
  
  // extract the token (support most standard formats)

  const token = (body && body.access_token) || 
                (query && query.access_token) || 
                headers['x-access-token'];    

  // verify

  TokenController.verifyToken(token)
    .then( user => {
        
        // allow user to be consumable
        // for the rest of the route
        // within req

        req.user = user;
        next();
    }).catch( error => {

      // otherwise, throw auth error back to user
      res.status(400)
        .json({ 
          message : 'invalid auth token provided' 
        });
  
    });
};