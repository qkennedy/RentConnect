var restify = require('restify');

function respond(req, res, next) {
  res.send('you got' + req.params.resp);
  next();
}

var server = restify.createServer();
server.get('/rest/test/:resp', respond);
server.head('/rest/hello/:resp', respond);
//Authentication
server.post('/rest/login',
  function(req, res, next) {
    //Here is where we can process the login info
  }
);
//Get User Details
server.post('/rest/whoAmI',
  function(req, res, next) {
    //Here is where we can process the login info
  }
);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
