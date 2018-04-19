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
    open() {
      this.connection = mysql.createConnection( this.conf )
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    //Converts an array of
    convertArray(array) {
      var newStr = '('
      for(var i = 0; i < array.length; i++) {
        newStr = newStr.concat('' + array[i])
        if(i-1 < array.length) {
          newStr = newStr.concat(', ')
        }
      }
      newStr = newStr.concat(')');
      return newStr;
    }

    convertTimeFromDb(dbTime) {

    }

    // AN EXPERIMENTAL MODIFED VERSION THAT WORKS ON SPECIFIC CONNECTIONS THAN A SYSTEM-WIDE connection
    open2() {
      return mysql.createConnection( this.conf )
    }
    query2( connection, sql, args ) {
        return new Promise( ( resolve, reject ) => {
            connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close2(connection) {
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
