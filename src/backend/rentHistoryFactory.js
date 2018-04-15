var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {

  getEntryById: function(id) {
    let entry;
      database.open()
      return database.query(`select * from rent_history where id = ?;`, [id]).then( rows => {
        entry = rows[0];
        return database.close()
      } )
      .then( () => {
      return entry;
     });
  },

  createRequest: function(propertyId, creatorId, request) {
    database.open();
    const created = Date.now()
    request.status = module.exports.convertStatusToInt(request)
    return database.query(INSERT INTO maint_request
      (id, property_id, creator_id, created_date, title, description, attached_files, worker_id, status)
      VALUES(null,?,?,?,?,?,?,null,?);,
      [propertyId, creatorId, created, request.title, request.description, request.attachedFiles, request.worker_id, 1]).then( () => {
      return database.close();
    });
  },

  deleteRequest: function(id) {
    database.open();
    return database.query(DELETE FROM maint_request WHERE id = ?;,
                          [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  },

  editMaintRequest: function(request) {
    database.open();
    return database.query(UPDATE maint_request SET
      title = ?, description = ?, attached_files = ?, worker_id = ?, status = ?
      WHERE id = ?;,
      [request.title, request.description, request.attachedFiles, 1, ]).then( () => {
      return database.close();
    });
  },

  getCommentsByRequestId: function(requestId) {
    let comments;
      database.open()
      return database.query('select * from comment where request_id = ?;', [requestId]).then( rows => {
        comments = rows;
        return database.close()
      } )
      .then( () => {
      return comments;
     });
  },

  addCommentForRequest: function(requestId, creatorId, comment) {
    database.open();
    const created = Date.now()
    return database.query(`insert into rentconnect.comment (id, request_id, creator_id, created_date, comment_text, attached_files)
      VALUES (null, ?, ?, ?, ?, ?);`,
      [requestId, creatorId, created, comment.text, comment.attachedFiles]).then( () => {
      return database.close();
    });
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
