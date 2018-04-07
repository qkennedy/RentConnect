var restify = require('restify');
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory');
var Database = require('./database')

var database = new Database({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});

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
server.get('/rest/whoAmI',
  function(req, res, next) {
    //Here is where we can process the login info
  }
);

//User EP


server.get('/rest/user/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  userFactory.getUserById(req.params.id).then(user => {
    res.send(user)
    next()
  });
});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/createuser',
  function(req, res, next) {
    //TODO need to talk to Jacob, figure out how to get the form data
    userFactory.createUser(req.params).then(() => {
      res.send(201)
      next()
    });
});

//Property EP

server.get('/rest/property/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works, but it would make testing easier if we can get it into userFactory
  let property
    database.open()
    database.query('select *   from property where id = ?;', [req.params.id]).then( rows => {
      property = rows[0];
      return database.close()
    } )
    .then( () => {
    res.send(property)
    next()
   });
  });


  server.get('/rest/property/:propId/tenants',
  function(req, res, next) {
    var tenants = propertyFactory.getTenantDetsByPropertyId(req.params.propId).then(tenants => {
      res.send(tenants)
      next()
    });
  });


server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
