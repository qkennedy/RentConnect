const mysql = require( 'mysql' );

class Database {
    constructor() {
      this.conf = {
        host     : 'localhost',
        user     : 'root',
        password : 'postgres',
        database : 'rentconnect',
        socketPath: '/var/run/mysqld/mysqld.sock'
      }
    }
    //Converts an array of
    convertArray(array) {
      var newStr = '('
      for(var i = 0; i < array.length; i++) {
        newStr = newStr.concat('' + array[i])
        if(i < (array.length - 1)) {
          newStr = newStr.concat(', ')
        }
      }
      newStr = newStr.concat(')');
      return newStr;
    }

    open() {
      return mysql.createConnection( this.conf )
    }
    query( connection, sql, args ) {
        return new Promise( ( resolve, reject ) => {
            connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close(connection) {
        return new Promise( ( resolve, reject ) => {
            connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
module.exports = Database;
