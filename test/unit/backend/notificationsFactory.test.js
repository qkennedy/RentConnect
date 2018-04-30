import notificationsFactory from '@/backend/notificationsFactory'
import Database from '@/backend/database'
jest.unmock('mysql')
jest.mock('@/backend/database')

beforeEach(() => {
  return jest.clearAllMocks();
});

  const mockOpen = jest.fn()
  const mockQuery = jest.fn()
  const mockClose = jest.fn()
function setUpMockDatabase(retValue) {
  const mockRows = retValue

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

  var database = new Database();
  notificationsFactory.setDatabase(database)
}

test('get Notifications', () => {
  const mockNotifications = [
    {
      id : 1,
      username: 'mockUser',
      mtitle: 'mockTitle',
      mstatus: 1,
      paddress: '123 Mock Strt'
    }
  ]

  setUpMockDatabase(mockNotifications)
  return notificationsFactory.getNotifications().then(notifs => expect(notifs).toEqual(mockNotifications));
});

test('Send Bulk Notifications', () => {
  let propIds = [1]
  let req = {
    propIds: propIds,
    subject: 'mockSubject',
    body: 'mockBody'
  }
  let resp = [
    {
      tenant_id: 1
    }
  ]

  setUpMockDatabase(resp)
  return notificationsFactory.sendBulkNotification(req).then( () => {
    expect(mockOpen.mock.calls.length).toEqual(2)
    expect(mockQuery.mock.calls.length).toEqual(2)
    expect(mockClose.mock.calls.length).toEqual(2)
  });
});
