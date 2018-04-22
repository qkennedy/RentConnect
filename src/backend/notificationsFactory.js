module.exports = {
  getNotifications: function(userId) {
    let notifs;
      var db = database.open()
      return database.query(db, `SELECT * FROM notifications WHERE recipient=? ORDER BY time DESC LIMIT 10;`, [userId]).then( rows => {
        notifs = rows;
        return database.close(db)
      })
      .then( () => {
      return notifs;
     });
  }

  createNotification: function(recId, subject, message, userId, propertyId, maint_req_id, type) {
    var db = database.open()
    return database.query(db, `INSERT INTO notifications
      (id, recipient, subject, message, time, user_id, property_id, maint_req_id, type)
      VALUES(Null, ?, ?, now(), ?, ?, ?, ?, ?);`,
      [recId, subject, message, userId, propertyId, maint_req_id, type]).then(() => {
      return database.close(db)
    })
  }
}
