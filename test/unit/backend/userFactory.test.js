import userFactory from '@/backend/userFactory'
import Database from '@/backend/database'
//This is broken, we need to read into how
jest.mock('@/backend/database', function() {
  return {
    default: function() {
      return {
        query: jest.fn().mockReturnValue({
          id : 1,
          username: "cam",
          password: "hashmepls",
          email: "cam@case.edu",
          cell_number: "1234567890",
          role: 1
        })
      };
    }
  };
});
const resp = {
  id : 1,
  username: "cam",
  password: "hashmepls",
  email: "cam@case.edu",
  cell_number: "1234567890",
  role: 1
}

test('converting Roles', () => {
  var testUser = {role: 1}
  testUser.role = userFactory.convertRole(testUser)
  expect(testUser.role).toEqual('tenant');
});

test('get User by Id', () => {
  return userFactory.getUserById(1).then(user => expect(user).toEqual(resp));
});

//Read more into mocking out MySQL server
