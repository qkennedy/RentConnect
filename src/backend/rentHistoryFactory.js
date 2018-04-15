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

  createEntry: function(propertyId, creatorId, request) {
    database.open();
    const created = Date.now()
    request.status = module.exports.convertStatusToInt(request)
    return database.query(`INSERT INTO rent_history
      (id, payer_id, property_id, payment_date, payment_amount, on_time)
      VALUES (null, ?, ?, ?, ?, ?);`,
      [propertyId, creatorId, created, request.title, request.description, request.attachedFiles, request.worker_id, 1]).then( () => {
      return database.close();
    });
  },

  deleteEntry: function(id) {
    database.open();
    return database.query(`DELETE FROM rent_history WHERE id = ?;`,
                          [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  },

  editEntry: function(entry) {
    database.open();
    return database.query(`UPDATE rent_history SET
      payer_id = ?, property_id = ?, payment_amount = ?, on_time = ?
      WHERE id = ?;`,
      [entry.payerId, entry.propertyId, entry.paymentAmount, entry.onTime, entry.id]).then( () => {
      return database.close();
    });
  },

  getEntriesForUser: function(userId) {
    let entries;
      database.open()
      return database.query(`select * from rent_history where payer_id = ?;`, [userId]).then( rows => {
        entries = rows;
        return database.close()
      } )
      .then( () => {
      return entries;
     });
  },

  getEntriesForProperty: function(propertyId) {
    let entries;
      database.open()
      return database.query(`select * from rent_history where property_id = ?;`, [propertyId]).then( rows => {
        entries = rows;
        return database.close()
      })
      .then( () => {
      return entries;
     });
  },
  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
