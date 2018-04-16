import Database from '@/backend/database'
const mysql = require( 'mysql' );
jest.mock('mysql')

const database = new Database()

const mockCreateConnection = jest.fn()
const mockQuery = jest.fn()
const mockEnd = jest.fn()

function mockMySQL(rows, err, closeErr, mockConnection) {
  const mockRows = [retValue]

  mockCreateConnection.mockImplementation((sql, args, func) => {
    return func(rows, err);
  });
  mockQuery.mockImplementation((sql, args, func) => {
    return func(rows, err);
  });
   mockEnd.mockImplementation((func) => {
    return func(closeErr)
  });

    mysql.mockImplementation( () => {
        return {
          createConnection: mockCreateConnection,
          query: mockQuery,
          end: mockEnds
        };
  });
}

test('converting Arrays to be SQL Friendly', () => {
  var testArray = [1, 2, 3]
  var convertedArray = database.convertArray(testArray)
  expect(convertedArray).toEqual('(1, 2, 3)');

});

test('Test Promise Correct For successful query', () => {
  const mockRows = [1, 2, 3]
  const err = {}
  const closeErr = {}
  const mockQuery = 'This is a mock Query'
  const mockArg = 1
  mockMySQL(rows, err, closeErr)
  database.open()
  database.query(mockQuery, mockArg).then( (rows) => {
    expect(rows).toEqual(mockRows);
  } );
});

test('Test Promise Correct For successful close', () => {
  const mockRows = [1, 2, 3]
  const err = {}
  const closeErr = {}
  const mockQuery = 'This is a mock Query'
  const mockArg = 1
  mockMySQL(rows, err, closeErr)
  database.open()
  database.close().then( () => {
    expect(mockEnd.mock.calls.length).toEqual(1)
  } );
});
