/* We need to think about how our setup of this should work, it should have an easy way to insert users
*  an easy way to get users for various different attributes, and update
*  also need a way to make objects from whatever mysql returns us
*  I worked with Hibernate before, could be useful if there is a good package for mysql
*/

//This should be moved to some kind of mysql config, so we don't need to
//declare this every time and automate the begin and end portions
//also should move away so we can mock this out
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});
module.exports = {

  getUserById: async function(id) {
    connection.connect();
    var user;
    connection.query('select *   from user where id = ?;', [id],
     function (error, results, fields) {
      if (error) throw error;
      console.log('the user is: ', results[0]);
      user = results[0]
    });
    connection.end();
    return user
  },

  //Need to make a function to convert roles from int to string
  createUser: async function(user) {
    connection.connect();
    var results = await connection.query(`insert into user (id, username, password, email, cell_number, role)
                      values(null, ?,?,?,?,?);`,
     [user.username, user.password, user.email, user.cellNumber, user.role],
     function (error, results, fields) {
      if (error) throw error;
    });
    console.log(results[0]);
    connection.end();
    return results[0];
  },

  convertRole: function(user) {
    switch(user.role) {
      case 1:
        user.role = 'tenant'
        break;
      case 2:
        user.role = 'landlord'
        break;
      case 3:
        user.role = 'maintenanceWorker'
        break;
      default:
        user.role = 'prospectiveUser'
        break;
    }
    return user
  }
}
