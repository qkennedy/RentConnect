import userFactory from '@/backend/userFactory'
import Database from '@/backend/database'
import bcrypt from 'bcrypt'
jest.mock('@/backend/database')
jest.unmock('mysql')

beforeEach(() => {
  return jest.clearAllMocks();
});

const saltRounds = 3;

const mockOpen = jest.fn()
const mockQuery = jest.fn()
const mockClose = jest.fn()
const mockConvertArray = jest.fn()

  let connectRefusedCode = 'ECONNREFUSED'
  let invalidIdCode = 'User does not exist'

function mockResolve(retValue) {
  const mockRows = retValue
  mockQuery.mockImplementation((sql, args) => {
    return Promise.resolve(mockRows)
  })
   mockClose.mockImplementation(() => {
    return Promise.resolve()
  })
  mockConvertArray.mockImplementation((array) => {
    var newStr = '('
    for(var i = 0; i < array.length; i++) {
      newStr = newStr.concat('' + array[i])
      if(i < (array.length - 1)) {
        newStr = newStr.concat(', ')
      }
    }
    newStr = newStr.concat(')');
    return newStr;
  })

    Database.mockImplementation( () => {
        return {
          open: mockOpen,
          query: mockQuery,
          close: mockClose,
          convertArray: mockConvertArray
        };
  });

  var database = new Database();
  userFactory.setDatabase(database)
}

  function mockQueryErr(retValue) {

    mockQuery.mockImplementation((sql, args) => {
      return Promise.reject(retValue)
    })
     mockClose.mockImplementation(() => {
      return Promise.resolve()
    })

    mockConvertArray.mockImplementation((array) => {
      var newStr = '('
      for(var i = 0; i < array.length; i++) {
        newStr = newStr.concat('' + array[i])
        if(i < (array.length - 1)) {
          newStr = newStr.concat(', ')
        }
      }
      newStr = newStr.concat(')');
      return newStr;
    })

      Database.mockImplementation( () => {
          return {
            open: mockOpen,
            query: mockQuery,
            close: mockClose,
            convertArray: mockConvertArray

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
  mockResolve([resp])
  return userFactory.getUserById(1).then(user => expect(user).toEqual(output));
});

test('get User by Invalid Id throws error', () => {
  const mockError = {
    "code": "User does not exist",
    "fatal": false
  }

  mockQueryErr(mockError)
  return userFactory.getUserById(10000).then(user => {
    //Fail if we get here
  }).catch( err => {
    expect(err.code).toEqual(invalidIdCode)
    expect(err.fatal).toEqual(false)
    expect(mockClose.mock.calls.length).toEqual(1)
  });

});

test('get User by Id, Database Not Running error', () => {
  const mockError = {
    code: "ECONNREFUSED",
    errno: "ECONNREFUSED",
    "fatal": true
  }

  mockQueryErr(mockError)
  return userFactory.getUserById(10000).then(user => {
    //Fail if we get here
  }).catch( err => {
    expect(err.code).toEqual(connectRefusedCode)
    expect(err.fatal).toEqual(true)
    expect(mockClose.mock.calls.length).toEqual(0)
  });
});

test('get User by Username', () => {
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
  mockResolve([resp])
  return userFactory.getUserByUsername('mockUser').then(user => expect(user).toEqual(output));
});

test('get User By UN no mapped user', () => {
  const username = 'mockUser'
  const mockError = {
    "code": `No user with username ${username}` ,
    "fatal": false
  }

  mockResolve([{}])
  return userFactory.getUserByUsername(username).then(user => {
  }).catch( err => {
    expect(err.code).toEqual(mockError.code)
    expect(err.fatal).toEqual(mockError.fatal)
    expect(mockClose.mock.calls.length).toEqual(1)
  });

});

test('get User Basic Details', () => {
  const resp = {
    username: "mockUser",
    email: "email@mock.com",
    cell_number: "1112224444"
  }
  const output = resp
  mockResolve([resp])
  return userFactory.getBasicDetails(1).then(user => expect(user).toEqual(output));
});

test('get Users Basic Details', () => {
  const resp = [
    {
      username: "mockUser",
      email: "email@mock.com",
      cell_number: "1112224444"
    },
    {
      username: "mockUser2",
      email: "email2@mock.com",
      cell_number: "1800MOKCELL"
    }
  ];
  mockResolve(resp)
  return userFactory.getBasicDetForUsers([1,2]).then(users => {
    expect(users).toContain(resp[0])
    expect(users).toContain(resp[1])
  });
});



test('Create User', () => {
  var user = {
    username: "mockUser",
    password: "mockPass",
    email: "email@mock.com",
    cell_number: "1112224444",
    role: "tenant"
  }
  mockResolve({})
  return userFactory.createUser(user).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Delete a User', () => {

  mockResolve({})
  return userFactory.deleteUser(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Edit a User', () => {
  var user = {
    username: "mockUser",
    password: "mockPass",
    email: "email@mock.com",
    cell_number: "1112224444",
    role: "tenant"
  }
  mockResolve({})
  return userFactory.updateUser(user, 1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Can Send Notifications to Users in Properties', () => {
  const propId = 1
  const tenantIds = [1, 2]
  const req = {
    propIds: [propId],
    subject: 'mockSubject',
    body: 'mockBody'
  }
  const resp = tenantIds
  mockResolve([resp])
  return userFactory.sendNotifications(req).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(2)
    expect(mockClose.mock.calls.length).toEqual(1)
  })
});

test('Can Add Maint. Workers To Roster', () => {
  var mockUser = {
    username: 'mockWorker',
    landlordId: 1
  }
  var mockWorker = {
    id: 2,
    username: "mockWorker",
    password: "mockPass",
    email: "email@mock.com",
    cell_number: "1112224444",
    role: "maintenanceWorker"
  }
  mockResolve([mockWorker])
  return userFactory.addUserToRoster(mockUser).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(2)
    expect(mockQuery.mock.calls.length).toEqual(2)
    expect(mockClose.mock.calls.length).toEqual(2)
  });
});

test('Get Roster For Landlord', () => {
  var resp = [
    {
      landlord_id: 1,
      worker_id: 2
    },
    {
      landlord_id: 1,
      worker_id:3
    }
  ];
  mockResolve(resp)
  return userFactory.getRoster(1).then( rows => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
    expect(rows.length).toEqual(2)
    expect(rows).toContain(resp[0])
    expect(rows).toContain(resp[1])
  });
});

test('Can Delete Maint. Workers ', () => {
  var mockRequest = {
    workerId: 2,
    landlordId: 1
  }
  mockResolve([{}])
  return userFactory.removeFromRoster(mockRequest).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Verify User passes on valid PW', () => {
  const username = 'mockUser'
  const password = 'mockPass'
  const expectedUser = {
    id: 1,
    role: 'tenant',
    auth_token: 10
  }
  return bcrypt.hash(password, saltRounds).then(function(hash) {
    const resp = {
      id : 1,
      username: username,
      password: hash,
      email: "email@mock.com",
      cell_number: "1112224444",
      role: 1,
      auth_token: 10
    }
    mockResolve([resp])

    return userFactory.verifyUser(username, password).then( user => {
      expect(user).toEqual(expectedUser)
    });
  });
});

test('Verify User Fails on invalid PW', () => {
  const username = 'mockUser'
  const password = 'mockPass'
  const badPassword = 'notMockPass'
  let expectedErr = {
    description: "Invalid Password"
  }
  return bcrypt.hash(password, saltRounds).then(function(hash) {
    const resp = {
      id : 1,
      username: username,
      password: hash,
      email: "email@mock.com",
      cell_number: "1112224444",
      role: 1
    }
    mockResolve([resp])

    return userFactory.verifyUser(username, badPassword).then( user => {
    }).catch(err => {
      expect(err).toEqual(expectedErr)
    })
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
