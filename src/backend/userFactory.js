/* We need to think about how our setup of this should work, it should have an easy way to insert users
*  an easy way to get users for various different attributes, and update
*  also need a way to make objects from whatever mysql returns us
*  I worked with Hibernate before, could be useful if there is a good package for mysql
*/

//This should be moved to some kind of mysql config, so we don't need to
//declare this every time and automate the begin and end portions
//also should move away so we can mock this out
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'postgres',
  database : 'rentconnect'
});

function getUserById(id) {
  connection.connect();
  var user = {};
  connection.query('select *   from user where id = ?;', [id],
   function (error, results, fields) {
    if (error) throw error;
    console.log('the user is: ', results[0]);
    user = results[0]
  });
  connection.end();
  return user
}

//Need to make a function to convert roles
function createUser(user) {
  connection.connect();
  connection.query(`insert into user (id, username, password, email, cell_number, role)
                    values(null, ?,?,?,?,?);`,
   [user.username, user.password, user.email, user.cellNumber, user.role],
   function (error, results, fields) {
    if (error) throw error;
  });
  connection.end();
}
