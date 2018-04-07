const mysql = require( 'mysql' );

class Database {
    constructor( conf ) {
      this.conf = conf
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
}
module.exports = Database;
