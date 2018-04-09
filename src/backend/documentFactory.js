var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const propertyFactory = require('./propertyFactory')

var database = new Database({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});
module.exports = {

  getDocumentById: function(id) {
    let property;
      database.open()
      return database.query('select * from document where id = ?;', [id]).then( rows => {
        property = rows[0];
        return database.close()
      } )
      .then( () => {
      return property;
     });
  },

  createDocument: function(propertyId, creatorId, document) {
    database.open();
    const created = Date.now()
    return database.query(`INSERT INTO document
      (id,property_id,created_date,creator_id,title,file)
      VALUES(null,?,?,?,?,?,?)`,
      [propertyId, created, creatorId, document.title, document.file]).then( () => {
      return database.close();
    } );
  },

  deleteDocument: function(id) {
    database.open();
    return database.query(`DELETE FROM property WHERE id = ?;`,
                          [userId]).then( rows => {
      user = rows[0];
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  }
}