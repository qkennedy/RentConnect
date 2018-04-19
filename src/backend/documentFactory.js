var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database();
module.exports = {

  getDocumentById: function(id) {
    let property;
      var db = database.open()
      return database.query(db, 'select * from document where id = ?;', [id]).then( rows => {
        property = rows[0];
        return database.close(db)
      } )
      .then( () => {
      return property;
     });
  },

  createDocument: function(propertyId, creatorId, document) {
    var db = database.open();
    const created = (new Date()).toISOString().substring(0,10)
    return database.query(db, `INSERT INTO document
      (id,property_id,created_date,creator_id,title,file)
      VALUES(null,?,?,?,?,?,?)`,
      [propertyId, created, creatorId, document.title, document.file]).then( () => {
      return database.close(db);
    } );
  },

  deleteDocument: function(id) {
    var db = database.open();
    return database.query(db, `DELETE FROM property WHERE id = ?;`,
                          [id]).then(() => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close(db);
    });
  },

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
