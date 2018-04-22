var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {
  getLandLordsForWorker: function(workerId) {
    let landlords;
      database.open()
      return database.query(`select u.username, u.email, u.phone
         from user as u left join works_for as w on w.landlord_id=u.id
         where w.worker_id = ?;`, [workerId]).then( rows => {
        landlords = rows;
        return database.close()
      } )
      .then( () => {
      return landlords;
     });
  },
  getWorkersForLandlord: function(landlordId) {
    let workers;
      database.open()
      return database.query(`select u.username, u.email, u.phone
         from user as u left join works_for as w on w.worker_id=u.id
         where w.landlord_id = ?;`, [landlordId]).then( rows => {
        workers = rows;
        return database.close()
      } )
      .then( () => {
      return workers;
     });
  },

  assignWorkerToLandlord: function(workerId, landlordId) {
    database.open()
    return database.query(`INSERT INTO works_for
      (id, landlord_id, worker_id)
      VALUES(null, ?, ?);`, [landLordId, workerId]).then( () => {
      return database.close()
    });
  },

  removeWorkerFromLandlord: function(workerId, landlordId) {

  },

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
