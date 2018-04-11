import userFactory from '@/backend/userFactory'
import Database from '@/backend/database'
jest.mock('@/backend/database')

beforeEach(() => {
  return jest.clearAllMocks();
});

  const mockOpen = jest.fn()
  const mockQuery = jest.fn()
  const mockClose = jest.fn()
function setUpMockDatabase(retValue) {
  const mockRows = [retValue]



  mockQuery.mockImplementation((sql, args) => {
    return Promise.resolve(mockRows)
  })
   mockClose.mockImplementation(() => {
    return Promise.resolve()
  })

    Database.mockImplementation( () => {
        return {
          open: mockOpen,
          query: mockQuery,
          close: mockClose
        };
  });

  var database = new Database({
    host     : 'localhost',
    user     : 'root',
    password : 'postgres',
    database : 'rentconnect'
  });
  userFactory.setDatabase(database)
}

test('get User by Id', () => {
  const resp = {
    id : 1,
    username: "mockUser",
    password: "mockPass",
    email: "email@mock.com",
    cell_number: "1112224444",
    role: 1
  }
  const output = resp
  output.role = 'tenant'
  setUpMockDatabase(resp)
  return userFactory.getUserById(1).then(user => expect(user).toEqual(output));
});

test('get User Basic Details', () => {
  const resp = {
    username: "mockUser",
    email: "email@mock.com",
    cell_number: "1112224444"
  }
  const output = resp
  setUpMockDatabase(resp)
  return userFactory.getBasicDetails(1).then(user => expect(user).toEqual(output));
});

test('Create User', () => {
  var user = {
    username: "mockUser",
    password: "mockPass",
    email: "email@mock.com",
    cell_number: "1112224444",
    role: "tenant"
  }
  setUpMockDatabase({})
  return userFactory.createUser(user).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Delete a User', () => {

  setUpMockDatabase({})
  return userFactory.deleteUser(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('converting Int to Roles', () => {
  var testUser = {role: 1}
  testUser.role = userFactory.convertRole(testUser)
  expect(testUser.role).toEqual('tenant');
});

test('converting Roles to Int', () => {
  var testUser = {role: 'tenant'}
  testUser.role = userFactory.convertRoleToInt(testUser)
  expect(testUser.role).toEqual(1);
});

//Read more into mocking out MySQL server
