import userFactory from '@/backend/userFactory'

test('converting Roles', () => {
  var testUser = {role: 1}
  testUser = userFactory.convertRole(testUser)
  expect(testUser.role).toEqual('tenant');
});

//Read more into mocking out MySQL server
