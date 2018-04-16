var restify = require('restify');
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory');
const documentFactory = require('./documentFactory');
const maintRequestFactory = require('./MaintRequestFactory')
const rentHistoryFactory = require('./rentHistoryFactory')

function respond(req, res, next) {
  res.send('you got' + req.params.resp);
  next();
}
var activeId = 2;
var server = restify.createServer();

server.use(restify.plugins.bodyParser());

//Authentication
server.post('/rest/login',
  function(req, res, next) {
    //Here is where we can process the login info
    //For now assume that password is being passed in directly
    console.log(req.body.username, req.body.password)
    userFactory.verifyUser(req.body.username, req.body.password).then( userId => {
      if(userId === -1) {
        res.send(401, 'Invalid Login, Please try again')
      } else {
        res.send(200, 'This can be replaced with a 303 to send the user to their portal')
        activeId = userId
      }
      next()
      });
  }
);
//Get User Details
server.get('/rest/whoAmI',
  function(req, res, next) {
    //Here is where we can process the login info
    userFactory.getUserById(activeId).then(user => {
      res.send(user)
      next()
    });
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
    userFactory.createUser(req.body).then(() => {
      res.send(201)
      next()
    });
});

server.post('/rest/updateuser',
  function(req, res, next) {
    userFactory.updateUser(req.body).then(() => {
      res.send(201)
      next()
    });
});

server.put('/rest/deleteuser/:id',
  function(req, res, next) {
  userFactory.createUser(req.params).then(() => {
    res.send(202)
    next()
  });
});



//Property EP
server.get('/rest/property/:id',
  function(req, res, next) {
    propertyFactory.getPropertyById(req.params.id).then(property => {
      res.send(property)
      next()
    });
});

server.post('/rest/property/create',
  function(req, res, next) {
    propertyFactory.createProperty(req.body).then(property => {
      res.send(201)
      next()
    });
});

server.get('/rest/propertiesByLandlord/:id',
  function(req, res, next) {
    propertyFactory.getPropertiesByLandlordId(req.params.id).then(properties => {
      res.send(properties)
      next()
    });
});


//Tenant EPs

server.get('/rest/property/:propId/tenants',
  function(req, res, next) {
    propertyFactory.getTenantDetsByPropertyId(req.params.propId).then(tenants => {
      res.send(tenants)
      next()
    });
});

server.put('/rest/property/:propId/addTenant/:tenantId',
function(req, res, next) {
  propertyFactory.addTenant(req.params.propId, req.params.tenantId).then(() => {
    res.send(201)
    next()
  });
});

server.put('/rest/property/:propId/removeTenant/:tenantId',
function(req, res, next) {
  propertyFactory.removeTenant(req.params.propId, req.params.tenantId).then(() => {
    res.send(201)
    next()
  });
});

//Document EP

server.get('/rest/document/:docId',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  documentFactory.getDocumentById(req.params.docId).then(document => {
    res.send(document)
    next()
  });
});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/property/:propertyId/createdocument/',
  function(req, res, next) {
    //TODO need to talk to Jacob, figure out how to get the form data
    //TODO get the document, and provide it
    //TODO get user from session
    documentFactory.createDocument(req.params.propertyId, 1, {}).then(() => {
      res.send(201)
      next()
    });
});

server.put('/rest/document/delete/:docId',
  function(req, res, next) {
  documentFactory.deleteDocument(req.params.docId).then(() => {
    res.send(202)
    next()
  });
});

//Maint Request EP

server.get('/rest/request/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  maintRequestFactory.getRequestById(req.params.id).then(request => {
    res.send(request)
    next()
  });
});

server.get('/rest/request/:id/comments',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  maintRequestFactory.getCommentsByRequestId(req.params.id).then(comments => {
    res.send(comments)
    next()
  });
});

server.get('/rest/request/byLandlordId/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  maintRequestFactory.getRequestsByUser(req.params.id).then(reqs => {
    res.send(reqs)
    next()
  });
});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/request/createrequest/',
  function(req, res, next) {
    //TODO need to talk to Jacob, figure out how to get the form data
    //TODO get the document, and provide it
    //TODO get user from session
    maintRequestFactory.createRequest(req.body).then(request => {
      res.send(201)
      next()
    });
});

server.post('/rest/request/:id/addComment',
  function(req, res, next) {
    maintRequestFactory.addCommentForRequest(req.params.id, req.body).then(
      request => {
        res.send(201)
        next()
      }
    )
  }
);

server.put('/rest/request/delete/:reqId',
  function(req, res, next) {
  maintRequestFactory.deleteRequest(req.params.reqId).then(() => {
    res.send(202)
    next()
  });
});

//Rent History EP

server.get('/rest/renthistory/entry/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  rentHistoryFactory.getEntryById(req.params.id).then(entry => {
    res.send(entry)
    next()
  });
});

server.get('/rest/user/:userId/entries',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  rentHistoryFactory.getEntriesForUser(req.params.userId).then(entries => {
    res.send(entries)
    next()
  });
});

server.get('/rest/property/:propId/entries',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  rentHistoryFactory.getEntriesForProperty(req.params.propId).then(entries => {
    res.send(entries)
    next()
  });
});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/renthistory/createentry/',
  function(req, res, next) {
    //I need to make sure Jacob is passing stuff in right, or change the refs to match
  rentHistoryFactory.createEntry(req.body).then(request => {
    res.send(201)
    next()
  });
});

server.put('/rest/renthistory/entry/delete/:entryId',
  function(req, res, next) {
  rentHistoryFactory.deleteEntry(req.params.entryId).then(() => {
    res.send(202)
    next()
  });
});

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
