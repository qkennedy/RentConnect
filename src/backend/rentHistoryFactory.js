var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {

  getEntryById: function(id) {
    let entry;
      var db = database.open()
      return database.query(db, `select * from rent_history where id = ?;`, [id]).then( rows => {
        entry = rows[0];
        return database.close(db)
      } )
      .then( () => {
      return entry;
     });
  },

  createEntry: function(entry) {
    var db = database.open();
    return database.query(db, `INSERT INTO rent_history
      (payer_id, property_id, payment_date, payment_amount, on_time)
      VALUES (?, ?, NOW(), ?, ?);`,
      [entry.payerId, entry.propertyId, entry.paymentAmount, entry.onTime]).then( () => {
      return database.close(db);
    });
  },

  deleteEntry: function(id) {
    var db = database.open();
    return database.query(db, `DELETE FROM rent_history WHERE id = ?;`,
      [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close(db);
    });
  },

  editEntry: function(entry) {
    var db = database.open();
    return database.query(db, `UPDATE rent_history SET
      payer_id = ?, property_id = ?, payment_amount = ?, on_time = ?
      WHERE id = ?;`,
      [entry.payerId, entry.propertyId, entry.paymentAmount, entry.onTime, entry.id]).then( () => {
      return database.close(db);
    });
  },

  getEntriesForUser: function(userId) {
    let entries;
      var db = database.open()
      return database.query(db, `select * from rent_history where payer_id = ? order by payment_date desc;`, [userId]).then( rows => {
        entries = rows;
        return database.close(db)
      } )
      .then( () => {
      return entries;
     });
  },

  getEntriesForProperty: function(propertyId) {
    let entries;
      var db = database.open()
      return database.query(db, `select * from rent_history where property_id = ? order by payment_date desc;`, [propertyId]).then( rows => {
        entries = rows;
        return database.close(db)
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
