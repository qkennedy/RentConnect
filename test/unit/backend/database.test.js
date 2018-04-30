import mysql from 'mysql'
import Database from '@/backend/database'
jest.mock('mysql')

const database = new Database()

beforeEach(() => {
  return jest.clearAllMocks();
  mysql.__resetMockedData();
});

const mockErr = {
  "code": "User does not exist",
  "fatal": false
}


test('converting Arrays to be SQL Friendly', () => {
  var testArray = [1, 2, 3]
  var convertedArray = database.convertArray(testArray)
  expect(convertedArray).toEqual('(1, 2, 3)');

});

test('Test Promise Correct For successful query', () => {
  const mockRows = [1]
  const mockQuery = 'This is a mock Query'
  const mockArg = [1]
  mysql.__setMockRows(mockRows);
  var mockConnection = database.open()
  expect.assertions(1);
  return expect(database.query(mockConnection, mockQuery, mockArg)).resolves.toBe(mockRows)
});


test('Test Promise Rejects on Query Error', () => {
  const mockQuery = 'This is a mock Query'
  const mockArg = [1]
  expect.assertions(1);
  mysql.__setMockErr(mockErr)
  var mockConnection = database.open()
  expect.assertions(1);
  return expect(database.query(mockConnection, mockQuery, mockArg)).rejects.toBe(mockErr)
});

test('Test Promise Correct For successful close', () => {
  var mockConnection = database.open()
  expect.assertions(1);
  return database.close(mockConnection).then( () => {
    expect(mysql.__getMockEnd().mock.calls.length).toEqual(1)
  });
});

test('Test Promise Rejects on close error', () => {
  mysql.__setMockCloseErr(mockErr)
  var mockConnection = database.open()
  expect.assertions(1);
  return expect(database.close(mockConnection)).rejects.toBe(mockErr)
});
