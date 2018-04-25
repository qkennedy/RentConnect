var Database = require('./../backend/database')
const userFactory = require('./../backend/userFactory');
const propertyFactory = require('./../backend/propertyFactory');
const documentFactory = require('./../backend/documentFactory');
const maintRequestFactory = require('./../backend/MaintRequestFactory')
const rentHistoryFactory = require('./../backend/rentHistoryFactory')
const notificationsFactory = require('./../backend/notificationsFactory')

propertyFactory.notificationsFactory = notificationsFactory
propertyFactory.userFactory = userFactory

var database = new Database();

function isTableEmpty(tableName) {
  let count;
  let queryStr = 'select count(*) from ' + tableName + ';'
  console.log(queryStr);
  var db = database.open();
  return database.query(db, queryStr, []).then( rows => {
    count = rows[0];
    return database.close(db)
  } ).then( () => {
    console.log(count)
    return count === 0;
 });
}

function clearDatabase(tableName) {
  let queryStr = 'TRUNCATE TABLE ' + tableName + ';'
  console.log(queryStr);
  var db = database.open();
  return database.query(db, queryStr, []).then( () => {
    return database.close(db)
  } ).then( () => {
 });
}

//Clear Database
const releventTables =
  ['user',
  'property',
  'tenants',
  'application',
  'document',
  'maint_request',
  'comment',
  'rent_history',
  'notifications',
  'maint_roster']

for(let table of releventTables) {
    clearDatabase(table);
}

//Initiate Users
const landlord = {
  username: 'babs',
  password: 'pass',
  email: 'babs@case.edu',
  phone: '216-368-3333',
  role: "landlord",
  auth_token: 3
}

const tenant1 = {
  username: 'qck',
  password: 'pass',
  email: 'qck@case.edu',
  phone: '3334445555',
  role: 'tenant',
  auth_token: 4
}

const tenant2 = {
  username: 'jvvg',
  password: 'pass',
  email: 'jvvg@case.edu',
  phone: '1-800-962-9862',
  role: 'tenant',
  auth_token: 7
}

const maint = {
  username: 'sam',
  password: 'pass',
  email: 'maintenance@case.edu',
  phone: '1-800-411-PAIN',
  role: 'maintenanceWorker',
  auth_token: 656
}

userFactory.createUser(landlord).then(() => {
  userFactory.createUser(tenant1).then(() => {
    userFactory.createUser(tenant2)
  }).then(() => {
    userFactory.createUser(maint)
  })
})

//Initiate Properties

const property = {
  landlordId: 1,
  address: '1672 E117 St',
  rent: '1250',
  lateFee: '100',
  dueDate: '1'
}
propertyFactory.createProperty(property)
//Add as Tenant
propertyFactory.addTenant(2, 1)
//Here we can add anything else we need for this.
