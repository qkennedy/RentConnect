var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/rest/hello/:name', respond);
server.head('/rest/hello/:name', respond);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
