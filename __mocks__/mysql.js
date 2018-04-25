
const mysql = jest.genMockFromModule('mysql');

var mockRows = {}
var mockErr = undefined
var mockCloseErr = undefined


const mockCreateConnection = jest.fn()
const mockQuery = jest.fn()
const mockEnd = jest.fn()

function __setMockRows(rows) {
  mockRows = rows
}

function __setMockErr(err) {
  mockErr = err
}
function __getMockEnd() {
  return mockEnd
}

function __setMockCloseErr(closeErr) {
  mockCloseErr = closeErr
}

function __resetMockedData() {
  mockRows = Object.create(null);
  mockErr = undefined
  mockCloseErr = undefined
}

mockEnd.mockImplementation((func) => {
  return func(mockCloseErr)
});

mockQuery.mockImplementation((sql, args, func) => {
    return func(mockErr, mockRows);
});

var mockConnection = {
  query: mockQuery,
  end: mockEnd
}

function createConnection(conf) {
  return mockConnection
}


mysql.__setMockRows = __setMockRows;
mysql.__setMockErr = __setMockErr;
mysql.__setMockCloseErr = __setMockCloseErr
mysql.__getMockEnd = __getMockEnd;
mysql.__resetMockedData = __resetMockedData
mysql.createConnection = createConnection

module.exports = mysql;
