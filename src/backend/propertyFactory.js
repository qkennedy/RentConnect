var mysql = require('mysql');
var Database = require('./database')
const userFactory = require('./userFactory');
const notificationsFactory = require('./notificationsFactory')

var database = new Database();
module.exports = {
  notificationsFactory: null,
  userFactory: null,

  getPropertyById: function(id) {
    let property;
      var db = database.open()
      return database.query(db, 'select p.*,u.email,u.cell_number from property as p left join user as u on u.id=p.landlord_id where p.id = ?;', [id]).then( rows => {
        property = rows[0];
        return database.close(db)
      } )
      .then( () => {
      return property;
     });
  },
  getAvailableProperties: function(){
    let properties;
      var db = database.open()
      return database.query(db, `select * from property  where id not in (select property_id from tenants);`, []).then( rows => {
        properties = rows;
        return database.close(db)
      } )
      .then( () => {
      return properties;
     });
  },

  createProperty: function(property) {
    var db = database.open();
    return database.query(db, `INSERT INTO property
      (id, landlord_id, address, rent, late_fee, due_date)
      VALUES(null, ?, ?, ?, ?, ?);`,
      [property.landlordId, property.address, property.rent, property.lateFee, property.dueDate]).then( rows => {
       property = rows[0];
      return database.close(db);
      //TODO Do I need to return something here, or is resolve/error enough?  Add error handling, check this case.
    } );
  },

  editProperty: function(propId, property) {
    var db = database.open();
    return database.query(db, `UPDATE property
      SET address=?,
      rent=?,
      late_fee=?,
      due_date=?
      WHERE id=?`,
      [property.address, property.rent, property.lateFee, property.dueDate, propId]).then( rows => {
      return database.close(db);
    } );
  },

  deleteProperty: function(id) {
    var db = database.open();
    return database.query(db, `DELETE FROM property WHERE id = ?;`,
                          [id]).then( rows => {
      //Do I need to return results here?  Or does promise cover failure case
      return database.close(db);
    });
  },

  getPropertiesByLandlordId: function(landLordId) {
    let properties;
      var db = database.open()
      return database.query(db, 'select p.*,t.tenant_id,u.username AS tenant from property as p left join tenants as t on t.property_id=p.id left join user as u on u.id=t.tenant_id where p.landlord_id = ?;', [landLordId]).then( rows => {
        properties = rows;
        return database.close(db)
      } )
      .then( () => {
      return properties;
     });
  },

  //Should this be here, or should it be in userFactory?
  //It should be here, pulling from tenants, not Users
  getTenantDetsByPropertyId: function(propertyId) {
    let tenants;
      var db = database.open()
      return database.query(db, 'select (tenant_id) from tenants where property_id = ?;', [propertyId]).then( rows => {
        return this.userFactory.getBasicDetForUsers(rows)
      }).then( users => {
        tenants = users;
        return database.close(db)
      })
      .then( () => {
      return tenants;
     });
  },

  addTenant: function(tenantId, propertyId) {
    this.notificationsFactory.createNotification(tenantId, '', '', null, propertyId, null, 'propassign')
    var db = database.open();
    return database.query(db, `insert into tenants (id, tenant_id, property_id)
                      values(null, ?,?);`,
                      [tenantId, propertyId]).then( () => {
      return database.close(db);
    });
  },

  rejectApplication: function(applicationId) {
    var db = database.open();
    return database.query(db, 'SELECT property_id,applicant_id FROM application WHERE id=?', [applicationId]).then(rows => {
      var applicantId = rows[0].applicant_id
      var propertyId = rows[0].property_id
      return database.query(db, `UPDATE application SET status='rejected' WHERE id=?`,
                        [applicationId]).then( () => {
        this.notificationsFactory.createNotification(applicantId, '', '', null, propertyId, null, 'applicationreject')
        return database.close(db);
      });
    })
  },

  acceptApplication: function(applicationId) {
    var db = database.open();
    return database.query(db, `UPDATE application SET status='accepted' WHERE id=?`,
                      [applicationId]).then( () => {
      return database.close(db);
    })
  },

  createApplication: function(propertyId, applicantId, data) {
    var db = database.open();
    return database.query(db, 'SELECT landlord_id FROM property WHERE id=?', [propertyId])
      .then( rows => {
        return database.query(db, `INSERT INTO application(property_id,applicant_id,status,application_data)
        VALUES(?,?,'unread',?)`,
                          [propertyId, applicantId, JSON.stringify(data)]).then( data => {
          this.notificationsFactory.createNotification(rows[0].landlord_id, '', '', applicantId, propertyId, null, 'application', data.insertId)
          return database.close(db);
        });
      })
  },

  getApplicationById: function(applicationId) {
    var db = database.open();
    return database.query(db, 'SELECT * FROM application WHERE id=?', [applicationId]).then( rows => {
      database.close(db);
      if (rows.length > 0) {
        var appData = {
          application: JSON.parse(rows[0].application_data),
          propertyId: rows[0].property_id,
          applicantId: rows[0].applicant_id,
          status: rows[0].status
        }
        return appData
      } else {
        let err = {
          description: 'No such application'
        }
        throw err
      }
    })
  },

  //TODO Implement
  removeTenant: function(propertyId, tenantId) {
    var db = database.open();
    return database.query(db, `DELETE FROM property WHERE tenant_id = ? and property_id = ?;`,
                          [tenantId, propertyId]).then( rows => {
      user = rows[0];
      //Do I need to return results here?  Or does promise cover failure case
      return database.close(db);
    });
  },
  //Testing Functions

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
