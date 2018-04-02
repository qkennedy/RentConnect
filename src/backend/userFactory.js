/* We need to think about how our setup of this should work, it should have an easy way to insert users
*  an easy way to get users for various different attributes, and update
*  also need a way to make objects from whatever mysql returns us
*  I worked with Hibernate before, could be useful if there is a good package for mysql
*/

//This should be moved to some kind of mysql config, so we don't need to
//declare this every time and automate the begin and end portions
//also should move away so we can mock this out
var mysql = require('mysql');
var Database = require('./database')

var database = new Database({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});
module.exports = {

  getUserById: function(id) {
    let user;
      database.open()
      return database.query('select *   from user where id = ?;', [id]).then( rows => {
        user = rows[0];
        return database.close()
      } )
      .then( () => {
        user.role = this.convertRole(user)
        return user;
     });
  },

  getBasicDetails: function(id) {
    let user;
    database.open()
    return database.query('select (username, email, cell_number)   from user where id = ?;', [id]).then( rows => {
      user = rows[0];
      return database.close()
    } )
    .then( () => {
    return user;
   });
  },

  getBasicDetByIdArray: function(idArr) {
    let users;
    database.open()
    return database.query('select (username, email, cell_number)   from user where id in ?;', [idArr]).then( rows => {
      users = rows;
      return database.close()
    } )
    .then( () => {
    return users;
   });
  },

  createUser: function(user) {
    //need to add a method to hash password
    database.open();
    return database.query(`insert into user (id, username, password, email, cell_number, role)
                      values(null, ?,?,?,?,?);`,
                      [user.username, user.password, user.email, user.cellNumber, user.role]).then( rows => {
      user = rows[0];
      return database.close();
    } );
  },

  //LandLordSpecific


  convertRole: function(user) {
    switch(user.role) {
      case 1:
        return 'tenant'
        break;
      case 2:
        return 'landlord'
        break;
      case 3:
        return 'maintenanceWorker'
        break;
      default:
        return 'prospectiveUser'
        break;
    }
    return user
  }
}
