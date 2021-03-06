var mysql = require('mysql');
var Database = require('./database')
const maintRequestFactory = require('./MaintRequestFactory')

var database = new Database();

module.exports = {
  getNotifications: function(userId) {
    let notifs;
      var db = database.open()
      return database.query(db, `
        SELECT n.*,u.username,m.title AS mtitle,m.status AS mstatus,p.address AS paddress FROM notifications AS n
        LEFT JOIN user AS u ON u.id=n.user_id
        LEFT JOIN property AS p ON p.id=n.property_id
        LEFT JOIN maint_request AS m ON m.id=n.maint_req_id
        WHERE n.recipient=? ORDER BY time DESC LIMIT 10;`, [userId]).then( rows => {
        notifs = rows;
        return database.close(db)
      })
      .then( () => {
      return notifs;
     });
  },

  createNotification: function(recId, subject, message, userId, propertyId, maint_req_id, type, application_id = null) {
    var db = database.open()
    return database.query(db, `INSERT INTO notifications
      (recipient, subject, message, time, user_id, property_id, maint_req_id, application_id, type)
      VALUES(?, ?, ?, now(), ?, ?, ?, ?, ?);`,
      [recId, subject, message, userId, propertyId, maint_req_id, application_id, type]).then(() => {
      return database.close(db)
    })
  },

  sendBulkNotification: function(req) {
    if (req.propIds.length > 0) {
      var db = database.open()
      return database.query(db, 'SELECT tenant_id FROM tenants WHERE property_id IN(?)', [req.propIds])
        .then(rows => {
          var tenants = []
          var i
          for (i = 0; i < rows.length; i++) {
            this.createNotification(rows[i].tenant_id, req.subject, req.body, this.landlordId, null, null, 'bulk')
          }
          return database.close(db)
        })
    }
  },

  //Testing Functions

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
