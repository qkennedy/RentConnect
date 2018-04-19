var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');

var database = new Database();
module.exports = {

  getPropertyById: function(id) {
    let property;
      database.open()
      return database.query('select p.*,u.email,u.cell_number from property as p left join user as u on u.id=p.landlord_id where p.id = ?;', [id]).then( rows => {
        property = rows[0];
        return database.close()
      } )
      .then( () => {
      return property;
     });
  },

  createProperty: function(property) {
    database.open();
    console.log(JSON.stringify(property))
    return database.query(`INSERT INTO property
      (id, landlord_id, address, rent, late_fee, due_date)
      VALUES(null, ?, ?, ?, ?, ?);`,
      [property.landlordId, property.address, property.rent, property.lateFee, property.dueDate]).then( rows => {
       property = rows[0];
      return database.close();
      //TODO Do I need to return something here, or is resolve/error enough?  Add error handling, check this case.
    } );
  },

  deleteProperty: function(id) {
    database.open();
    return database.query(`DELETE FROM property WHERE id = ?;`,
                          [id]).then( rows => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  },

  getPropertiesByLandlordId: function(landLordId) {
    let properties;
      database.open()
      return database.query('select p.*,t.tenant_id,u.username AS tenant from property as p left join tenants as t on t.property_id=p.id left join user as u on u.id=t.tenant_id where p.landlord_id = ?;', [landLordId]).then( rows => {
        properties = rows;
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
    });
  },

  //TODO Implement
  removeTenant: function(propertyId, tenantId) {
    database.open();
    return database.query(`DELETE FROM property WHERE tenant_id = ? and property_id = ?;`,
                          [tenantId, propertyId]).then( rows => {
      user = rows[0];
      //Do I need to return results here?  Or does promise cover failure case
      return database.close();
    });
  },
  //Testing Functions

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
