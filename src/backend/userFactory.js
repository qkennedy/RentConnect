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
var bcrypt = require('bcrypt');

var database = new Database();
const saltRounds = 3;
module.exports = {

  getUserById: function(id) {
    let user;
      var db = database.open();
      return database.query(db, 'select u.id,u.username,u.email,u.cell_number,u.role,t.property_id from user as u left join tenants as t on t.tenant_id=u.id where u.id = ?;', [id]).then( rows => {
        user = rows[0];
        return database.close(db)
      } )
      .then( () => {
        if (typeof user === 'undefined') {
          user = {
            id: -1
          }
        } else {
          user.role = module.exports.convertRole(user)
        }
        return user;
     });
  },
  getUserByUsername: function(username, getPassword = false) {
    let user;
      var pwdFields = ''
      if (getPassword) {
        pwdFields = 'password,auth_token,'
      }
      var db = database.open()
      return database.query(db, 'select ' + pwdFields + 'id,username,email,cell_number,role from user where username = ?;', [username]).then( rows => {
        user = rows[0];
        if(!user) {
          err = {
            description: `No user with username ${username}`
          }
        }
        return database.close(db)
      } )
      .then( () => {
        user.role = module.exports.convertRole(user)
        return user;
     });
  },

  getBasicDetails: function(id) {
    let user;
    var db = database.open()
    return database.query(db, 'select (username, email, cell_number)   from user where id = ?;', [id]).then( rows => {
      user = rows[0];
      return database.close(db)
    } )
    .then( () => {
    return user;
   });
  },

  getBasicDetForUsers: function(idArr) {
    let users;
    let sqlArray = database.convertArray(idArr)
    console.log(sqlArray)
    var db = database.open()
    return database.query(db, 'select (username, email, cell_number)   from user where id in ?;', [sqlArray]).then( rows => {
      users = rows;
      return database.close(db)
    } )
    .then( () => {
    return users;
   });
  },

  createUser: function(user) {
    //need to add a method to hash password
    console.log(user)
    return bcrypt.hash(user.password, saltRounds).then(function(hash) {
      // Store hash in your password DB.
      var db = database.open();
      return database.query(db, `insert into user (id, username, password, email, cell_number, role, auth_token)
                            values(null, ?,?,?,?,?,?);`,
                            [user.username, hash, user.email, user.phone, module.exports.convertRoleToInt(user), Math.floor(Math.random() * 10000000)]).then(() => {
        return database.close(db);
      });
    });
  },

  updateUser: function(user, userId) {
    var db = database.open();
    var formFields = [user.email, user.cell_number, userId]
    return database.query(db, 'UPDATE user SET email=?,cell_number=? WHERE id=?', formFields)
    .then( () => {
      return database.close(db);
    })
  },

  changePassword: function(userId, oldPass, newPass) {
    return this.getUserById(userId).then(user => {
      return bcrypt.compare(oldPass, user.password).then( res => {
        if(res) {
          // Encrypt the new password, and update the database
          return bcrypt.hash(newPass, saltRounds).then(function(hash) {
            var db = database.open();
            return database.query(db, `UPDATE user SET password=?`, [hash]).then(() => {
              return database.close(db)
            });
          });

        } else {
          //The old password was not correct
          let err = {
            description: "Invalid Password"
          }
          throw err
        }
      });
    });
  },

  deleteUser: function(userId) {
    var db = database.open();
    return database.query(db, `DELETE FROM user WHERE id = ?;`,
                      [userId]).then(() => {
      return database.close(db);
    });
  },

  addUserToRoster: function(user) {
    return this.getUserByUsername(user.username)
      .then(userInfo => {
        if (userInfo.role !== 'maintenanceWorker') {
          let err = {
            description: 'User is not a maintenance worker'
          }
          throw err
        }
        var db = database.open();
        return database.query(db, `INSERT INTO maint_roster(landlord_id,worker_id) VALUES(?,?)`,
                          [user.landlordId, userInfo.id]).then(() => {
          return database.close(db);
        });
      })
      .catch(e => {
        throw e
      })
  },

  sendNotifications: function(req) {
    var notifsToInsert = []
    var db = database.open()
    return database.query(db, 'SELECT tenant_id FROM tenants WHERE property_id IN(?)', [req.propIds])
      .then(rows => {
        var tenants = []
        var i
        for (i = 0; i < rows.length; i++) {
          tenants.push(rows[i].tenant_id)
        }
        console.log(JSON.stringify(tenants))
        return database.query(db, `INSERT INTO notifications(recipient, subject, message, time) VALUES(?, ?, ?, NOW())`,
          [tenants, 'Message from landlord: ' + req.subject, req.body]).then(() => {
            return database.close(db)
        })
      })
  },

  getRoster: function(landlordId) {
    var db = database.open()
    return database.query(db, `SELECT u.id,u.username FROM maint_roster AS r
      LEFT JOIN user AS u ON u.id=r.worker_id
      WHERE r.landlord_id=?`, [landlordId]).then(rows => {
      database.close(db)
      return rows
    })
  },

  removeFromRoster: function(request) {
    var db = database.open()
    return database.query(db, `DELETE FROM maint_roster
      WHERE worker_id=? AND landlord_id=?`, [request.workerId, request.landlordId]).then(rows => {
      database.close(db)
      return rows
    })
  },

  // TODO This I think should technically be split out, have one that just returns true
  // and then something else to return these details
  verifyUser: function(username, password) {
    let currUser = {}
    return module.exports.getUserByUsername(username, true).then(user => {
      currUser.id = user.id
      console.log(user)
      currUser.role = user.role
      currUser.auth_token = user.auth_token
      return bcrypt.compare(password, user.password).then( res => {
        if(!res) {
          let err = {
            description: "Invalid Password"
          }
          throw err
        } else {
          console.log(currUser)
          return currUser
        }
      });
    });
  },

  verifyToken: function(userId, token) {
    console.log(userId, token)
    var db = database.open()
    return database.query(db, 'SELECT id FROM user WHERE id=? AND auth_token=?', [userId, token]).then(rows => {
      if (rows.length > 0) {
        return true
      } else {
        return false
      }
    })
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
        return 3
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
