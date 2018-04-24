var Database = require('./../backend/database')
const userFactory = require('./../backend/userFactory');
const propertyFactory = require('./../backend/propertyFactory');
const documentFactory = require('./../backend/documentFactory');
const maintRequestFactory = require('./../backend/MaintRequestFactory')
const rentHistoryFactory = require('./../backend/rentHistoryFactory')
const notificationsFactory = require('./../backend/notificationsFactory')

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
  'notifications']

for(let table of releventTables) {
    clearDatabase(table);
}

//Initiate Users
const landlord = {
  username: 'babs',
  password: 'pass',
  email: 'babs@case.edu',
  cell_number: 2168675309,
  role: "landlord",
  auth_token: 3
}

const tenant = {
  username: 'qck',
  password: 'pass',
  email: 'qck@case.edu',
  cell_number: 3334445555,
  role: 'tenant',
  auth_token: 4
}
userFactory.createUser(landlord);
userFactory.createUser(tenant)

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
