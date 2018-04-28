var restify = require('restify');
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory');
const documentFactory = require('./documentFactory');
const maintRequestFactory = require('./MaintRequestFactory')
const rentHistoryFactory = require('./rentHistoryFactory')
const notificationsFactory = require('./notificationsFactory')

//cross-reference the classes
maintRequestFactory.userFactory = userFactory
maintRequestFactory.notificationsFactory = notificationsFactory
maintRequestFactory.propertyFactory = propertyFactory

propertyFactory.userFactory = userFactory
propertyFactory.notificationsFactory = notificationsFactory

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
    userFactory.verifyUser(req.body.username, req.body.password).then( user => {
        res.send(200, user)
      }).catch( err => {
        res.send(401, err)
      });
      next()
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


server.get('/rest/user/:id/:token',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  userFactory.verifyToken(req.params.id, req.params.token).then(allowed => {
    if (allowed) {
      userFactory.getUserById(req.params.id).then(user => {
        res.send(user)
        next()
      }).catch(err => {
        res.send(400, err)
        next()
      });
    } else {
      res.send(403)
      next()
    }
  })

});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/user/create',
  function(req, res, next) {
    userFactory.createUser(req.body).then(() => {
      res.send(201)
      next()
    })
    .catch(() => {
      res.send(400)
      next()
    })
});

server.post('/rest/user/addToRoster',
  function(req, res, next) {
    userFactory.addUserToRoster(req.body).then(() => {
      res.send(201)
      next()
    })
      .catch(err => {
        res.send(400, err)
      });
});

server.post('/rest/notifications/send',
  function(req, res, next) {
    notificationsFactory.sendBulkNotification(req.body).then(() => {
      res.send(201)
      next()
    })
      .catch(err => {
        res.send(400, err)
      });
});

server.post('/rest/user/removeFromRoster',
  function(req, res, next) {
    userFactory.removeFromRoster(req.body).then(() => {
      res.send(201)
      next()
    })
      .catch(err => {
        res.send(400, err)
      });
});

server.get('/rest/user/getRoster/:id',
  function(req, res, next) {
    userFactory.getRoster(req.params.id).then(roster => {
      res.send(roster)
      next()
    })
      .catch(err => {
        res.send(400, err)
      });
});

server.post('/rest/user/:id/update',
  function(req, res, next) {
    userFactory.updateUser(req.body, req.params.id).then(() => {
      res.send(201)
      next()
    });
});

server.post('/rest/user/:id/changePassword',
  function(req, res, next) {
    userFactory.changePassword(req.params.id, req.body.curpassword, req.body.password).then(() => {
      res.send(201)
      next()
    }).catch( err => {
      res.send(400, err)
    });
  }
)

server.put('/rest/user/:id/delete',
  function(req, res, next) {
  userFactory.deleteUser(req.params.id).then(() => {
    res.send(202)
    next()
  });
});

server.get('/rest/user/:id/notifications',
  function(req, res, next) {
  notificationsFactory.getNotifications(req.params.id).then(notifications => {
    res.send(notifications)
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

server.post('/rest/property/:id/apply',
  function(req, res, next) {
    propertyFactory.createApplication(req.params.id, req.body.applicantId, req.body).then(property => {
      res.send(201)
      next()
    });
});

server.get('/rest/application/:id',
  function(req, res, next) {
    propertyFactory.getApplicationById(req.params.id).then(application => {
      res.send(application)
      next()
    })
    .catch(e => {
      if (e.description === 'No such application') {
        res.send(400)
      } else {
        res.send(500)
      }
    });
});

server.post('/rest/property/:id/edit',
  function(req, res, next) {
    propertyFactory.editProperty(req.params.id, req.body).then(property => {
      res.send(201)
      next()
    });
});

server.get('/rest/property/landlord/:id',
  function(req, res, next) {
    propertyFactory.getPropertiesByLandlordId(req.params.id).then(properties => {
      res.send(properties)
      next()
    });
});

server.get('/rest/property/getAvailableProperties',
  function(req, res, next) {
    propertyFactory.getAvailableProperties().then(properties => {
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
  propertyFactory.addTenant(req.params.tenantId, req.params.propId).then(() => {
    res.send(201)
    next()
  });
});

server.put('/rest/property/application/:id/reject',
function(req, res, next) {
  propertyFactory.rejectApplication(req.params.id).then(() => {
    res.send(201)
    next()
  });
});

server.put('/rest/property/application/:id/accept',
function(req, res, next) {
  propertyFactory.acceptApplication(req.params.id).then(() => {
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
  maintRequestFactory.getRequestsByUser(req.params.id, 'landlord').then(reqs => {
    res.send(reqs)
    next()
  });
});

server.get('/rest/request/byTenantId/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  maintRequestFactory.getRequestsByUser(req.params.id, 'tenant').then(reqs => {
    res.send(reqs)
    next()
  });
});

server.get('/rest/request/byWorkerId/:id',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  maintRequestFactory.getRequestsByUser(req.params.id, 'maintenanceWorker').then(reqs => {
    res.send(reqs)
    next()
  });
});

server.post('/rest/property/:propId/request/create',
  function(req, res, next) {
    //TODO Change calls on the backend to respond to these changes
    maintRequestFactory.createRequest(req.body, req.body.creatorId, req.params.propId, propertyFactory).then(request => {
      res.send(request)
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

server.post('/rest/request/:id/updateStatus',
  function(req, res, next) {
    maintRequestFactory.updateStatus(req.params.id, req.body).then(
      request => {
        res.send(201)
        next()
      }
    )
  }
);

server.post('/rest/request/:id/assign',
  function(req, res, next) {
    maintRequestFactory.assign(req.params.id, req.body).then(
      request => {
        res.send(201)
        next()
      }
    )
  }
);

server.put('/rest/request/:reqId/delete',
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

server.get('/rest/renthistory/entries/user/:userId',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  rentHistoryFactory.getEntriesForUser(req.params.userId).then(entries => {
    res.send(entries)
    next()
  });
});

server.get('/rest/renthistory/entries/property/:propId',
  function(req, res, next) {
  //Need to have some security around endpoints like this.
  //This Works! This is the format we should do almost everything with
  rentHistoryFactory.getEntriesForProperty(req.params.propId).then(entries => {
    res.send(entries)
    next()
  });
});

//TODO need to add error handling on these -- Also, make sure if we are passing the pw across here that it is encrypted
server.post('/rest/renthistory/entry/create',
  function(req, res, next) {
    //I need to make sure Jacob is passing stuff in right, or change the refs to match
  rentHistoryFactory.createEntry(req.body).then(request => {
    res.send(201)
    next()
  });
});

server.put('/rest/renthistory/entry/:entryId/delete',
  function(req, res, next) {
  rentHistoryFactory.deleteEntry(req.params.entryId).then(() => {
    res.send(202)
    next()
  });
});

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});
