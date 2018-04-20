var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {

  getRequestById: function(id) {
    let request;
      var db = database.open()
      return database.query(db, 'select * from maint_request where id = ?;', [id]).then( rows => {
        request = rows[0];
        request.status = this.convertIntToStatus(request)
        return database.close(db)
      } )
      .then( () => {
      return request;
     });
  },

  createRequest: function(request, creatorId, propertyId) {
    //first get the property info
    return propertyFactory.getPropertyById(propertyId).then(propertyInfo => {
      var db = database.open();
      const created = (new Date()).toISOString().substring(0,10)
      request.status = module.exports.convertStatusToInt(request)
      return database.query(db, `INSERT INTO maint_request
        (id, property_id, creator_id, created_date, title, description, attached_files, worker_id, status)
        VALUES(null,?,?,?,?,?,?,null,?);`,
        [propertyId, creatorId, created, request.title, request.description, request.attachedFiles, request.worker_id, 1])
        .then( data => {
          userFactory.createNotification(propertyInfo.landlord_id, 'New maintenance request', 'You have a new maintenance request for ' + propertyInfo.address + ': <a href="#/ViewMaintenanceRequest/' + data.insertId +'">' + request.title + '</a>') //notify the landlord
          return {
            id: data.insertId
          }
        return database.close(db);
      });
    })

  },

  deleteRequest: function(id) {
    var db = database.open();
    return database.query(db, `DELETE FROM maint_request WHERE id = ?;`,
                          [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close(db);
    });
  },

  editMaintRequest: function(request) {
    var db = database.open();
    return database.query(db, `UPDATE maint_request SET
      title = ?, description = ?, attached_files = ?, worker_id = ?, status = ?
      WHERE id = ?;`,
      [request.title, request.description, request.attachedFiles, 1, ]).then( () => {
      return database.close(db);
    });
  },

  updateStatus: function(id, request) {
    // TODO: notify all involved (landlord, tenant, worker) besides the one who posted it
    this.addCommentForRequest(id, {
      creatorId: request.creatorId,
      text: 'Set status to ' + request.status,
      attachedFiles: ''
    })
    var db = database.open();
    return database.query(db, `UPDATE maint_request SET
      status = ?
      WHERE id = ?;`,
      [this.convertStatusToInt(request), id ]).then( () => {
      return database.close(db);
    });
  },

  assign: function(id, request) {
    userFactory.createNotification(request.worker, 'Request assigned', 'You have been assigned a request: <a href="#/ViewMaintenanceRequest/' + id + '"">' + request.title + '</a>')
    this.addCommentForRequest(id, {
      creatorId: request.creatorId,
      text: 'Assigned request to worker',
      attachedFiles: ''
    })
    var db = database.open();
    return database.query(db, `UPDATE maint_request SET
      worker_id = ?
      WHERE id = ?;`,
      [request.worker, id ]).then( () => {
      return database.close(db);
    });
  },

  getCommentsByRequestId: function(requestId) {
    let comments;
      var db = database.open()
      return database.query(db, `select c.*,u.username,u.role
        from comment as c left join user as u on u.id=c.creator_id where request_id = ?;`,
        [requestId]).then( rows => {
        comments = rows;
        var i;
        for (i = 0; i < comments.length; i++) {
          comments[i].role = userFactory.convertRole(comments[i])
        }
        return database.close(db)
      } )
      .then( () => {
      return comments;
     });
  },

  addCommentForRequest: function(requestId, comment) {
    // TODO: notify all involved (landlord, tenants, worker) besides the one who posted it
    var db = database.open();
    const created = (new Date()).toISOString().substring(0,10)
    return database.query(db, `INSERT INTO comment
      (id, request_id, creator_id, created_date, comment_text, attached_files)
      VALUES
      (null, ?, ?, ?, ?, ?);`,
      [requestId, comment.creatorId, created, comment.text, comment.attachedFiles]).then( () => {
      return database.close(db);
    });
  },

  getRequestsByUser: function(userId, role) {
    let requests;
    var db = database.open()
    var whereField = 'm.creator_id'
    switch (role) {
      case 'landlord':
        whereField = 'p.landlord_id'
        break
      case 'tenant':
        whereField = 'm.creator_id'
        break
      case 'maintenanceWorker':
        whereField = 'm.worker_id'
        break
    }
    return database.query(db,
      `SELECT p.address,m.status,m.created_date,m.id
       FROM maint_request AS m
       LEFT JOIN property AS p ON p.id=m.property_id
       WHERE ` + whereField + `=?
       ORDER BY m.created_date DESC`,
      [userId]).then(rows => {
      requests = rows
      var i
      for (i = 0; i < requests.length; i++) {
        requests[i].status = this.convertIntToStatus(requests[i])
      }
    })
    .then( () => {
      return requests
    })
  },


  convertIntToStatus(request) {
    switch(request.status) {
      case 1:
        return 'open'
        break;
      case 2:
        return 'pending'
        break;
      case 3:
        return 'closed'
        break;
      case 4:
        return 'confirmed'
        break;
      default:
        return 'open'
        break;
    }
  },

  convertStatusToInt(request) {
    switch(request.status) {
      case 'open':
        return 1
        break;
      case 'pending':
        return 2
        break;
      case 'closed':
        return 3
        break;
      case 'confirmed':
        return 4
        break;
      default:
        return 'open'
        break;
    }
  },
  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
