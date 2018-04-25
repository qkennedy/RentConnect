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
  database.open()
  expect.assertions(1);
  return expect(database.query(mockQuery, mockArg)).resolves.toBe(mockRows)
});


test('Test Promise Rejects on Query Error', () => {
  const mockQuery = 'This is a mock Query'
  const mockArg = [1]
  expect.assertions(1);
  mysql.__setMockErr(mockErr)
  database.open()
  expect.assertions(1);
  return expect(database.query(mockQuery, mockArg)).rejects.toBe(mockErr)
});

test('Test Promise Correct For successful close', () => {
  database.open()
  expect.assertions(1);
  return database.close().then( () => {
    expect(mysql.__getMockEnd().mock.calls.length).toEqual(1)
  });
});

test('Test Promise Rejects on close error', () => {
  mysql.__setMockCloseErr(mockErr)
  database.open()
  expect.assertions(1);
  return expect(database.close()).rejects.toBe(mockErr)
});
