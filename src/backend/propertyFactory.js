var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');

var database = new Database({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});
module.exports = {

  getPropertyById: function(id) {
    let property;
      database.open()
      return database.query('select *   from property where id = ?;', [id]).then( rows => {
        property = rows[0];
        return database.close()
      } )
      .then( () => {
      return property;
     });
  },

  //Need to make a function to convert roles from int to string
  //TODO implement this
  createProperty: function(property) {
    database.open();
    return database.query(`insert into user (id, username, password, email, cell_number, role)
                      values(null, ?,?,?,?,?);`,
                      [user.username, user.password, user.email, user.cellNumber, user.role]).then( rows => {
      user = rows[0];
      return database.close();
    } );
  },

  deleteProperty: function(id) {

  },

  getPropertiesByLandlordId: function(landLordId) {
    let properties;
      database.open()
      return database.query('select * from property where landlord_id = ?;', [landLordId]).then( rows => {
        property = rows;
        return database.close()
      } )
      .then( () => {
      return properties;
     });
  },

  //Should this be here, or should it be in userFactory?
  //It should be here, pulling from tenants, not Users
  getTenantDetsByPropertyId: function(propertyId) {
    let tenants;
      database.open()
      return database.query('select (tenant_id) from tenants where property_id = ?;', [propertyId]).then( rows => {
        return userFactory.getBasicDetForUsers(rows)
      }).then( users => {
        tenants = users;
        return database.close()
      })
      .then( () => {
      return tenants;
     });
  },

  addTenant: function(tenantId, propertyId) {
    database.open();
    return database.query(`insert into tenants (id, tenant_id, property_id)
                      values(null, ?,?);`,
                      [tenantId, property_id]).then( () => {
      return database.close();
    } );
  },

  //TODO Implement
  removeTenant: function(propertyId, tenantId) {

  },
  //Testing Functions

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
