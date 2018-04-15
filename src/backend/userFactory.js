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

var database = new Database();
module.exports = {

  getUserById: function(id) {
    let user;
      database.open()
      return database.query('select *   from user where id = ?;', [id]).then( rows => {
        user = rows[0];
        return database.close()
      } )
      .then( () => {
        if (typeof user === 'undefined') {
          user = {
            id: -1
          }
        } else {
          user.role = this.convertRole(user)
        }
        return user;
     });
  },
  getUserByUsername: function(username) {
    let user;
      database.open()
      return database.query('select * from user where username = ?;', [username]).then( rows => {
        user = rows[0];
        return database.close()
      } )
      .then( () => {
        if (typeof user === 'undefined') {
          user = {
            id: -1
          }
        } else {
          user.role = this.convertRole(user)
        }
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

  getBasicDetForUsers: function(idArr) {
    let users;
    let sqlArray = database.convertArray(idArr)
    console.log(sqlArray)
    database.open()
    return database.query('select (username, email, cell_number)   from user where id in ?;', [sqlArray]).then( rows => {
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
                      [user.username, user.password, user.email, user.phone, this.convertRoleToInt(user)]).then(() => {
      return database.close();
    } );
  },

  deleteUser: function(userId) {
    database.open();
    return database.query(`DELETE FROM user WHERE id = ?;`,
                      [userId]).then(() => {
      return database.close();
    });
  },

  verifyUser: function(username, password) {
    return this.getUserByUsername(username).then(user => {
      if(user.password === password) {
        return user.id;
      } else {
        //This should be changed to throw an error, caught by a error resolve here
        //TODO fix this.
        return -1;
      }
    });
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
  },

  convertRoleToInt: function(user) {
    switch(user.role) {
      case 'tenant':
        return 1
        break;
      case 'landlord':
        return '2'
        break;
      case 'maintenanceWorker':
        return 1
        break;
      default:
        return 4
        break;
    }
    return user
  },
  //Testing Functions

  //This lets us mock out the database, so that we can check calls, supply responses
  setDatabase: function(newDb) {
    database = newDb
  }
}
