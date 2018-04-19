var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {

  getRequestById: function(id) {
    let request;
      database.open()
      return database.query('select * from maint_request where id = ?;', [id]).then( rows => {
        request = rows[0];
        return database.close()
      } )
      .then( () => {
      return request;
     });
  },

  createRequest: function(request, creatorId, propertyId) {
    database.open();
    const created = (new Date()).toISOString().substring(0,10)
    request.status = module.exports.convertStatusToInt(request)
    return database.query(`INSERT INTO maint_request
      (id, property_id, creator_id, created_date, title, description, attached_files, worker_id, status)
      VALUES(null,?,?,?,?,?,?,null,?);`,
      [propertyId, creatorId, created, request.title, request.description, request.attachedFiles, request.worker_id, 1])
      .then( data => {
        return {
          id: data.insertId
        }
      return database.close();
    });
  },

  deleteRequest: function(id) {
    database.open();
    return database.query(`DELETE FROM maint_request WHERE id = ?;`,
                          [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  },

  editMaintRequest: function(request) {
    database.open();
    return database.query(`UPDATE maint_request SET
      title = ?, description = ?, attached_files = ?, worker_id = ?, status = ?
      WHERE id = ?;`,
      [request.title, request.description, request.attachedFiles, 1, ]).then( () => {
      return database.close();
    });
  },

  getCommentsByRequestId: function(requestId) {
    let comments;
      database.open()
      return database.query(`select c.*,u.username,u.role
        from comment as c left join user as u on u.id=c.creator_id where request_id = ?;`,
        [requestId]).then( rows => {
        comments = rows;
        var i;
        for (i = 0; i < comments.length; i++) {
          comments[i].role = userFactory.convertRole(comments[i])
        }
        return database.close()
      } )
      .then( () => {
      return comments;
     });
  },

  addCommentForRequest: function(requestId, comment) {
    database.open();
    const created = (new Date()).toISOString().substring(0,10)
    return database.query(`INSERT INTO comment
      (id, request_id, creator_id, created_date, comment_text, attached_files)
      VALUES
      (null, ?, ?, ?, ?, ?);`,
      [requestId, comment.creatorId, created, comment.text, comment.attachedFiles]).then( () => {
      return database.close();
    });
  },

  getRequestsByUser: function(landlordId) {
    let requests;
    database.open()
    return database.query(
      `SELECT p.address,m.status,m.created_date,m.id
       FROM maint_request AS m LEFT JOIN property AS p ON p.id=m.property_id
       WHERE p.landlord_id=?`,
      [landlordId]).then(rows => {
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
