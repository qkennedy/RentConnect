import userFactory from '@/backend/userFactory'
import propertyFactory from '@/backend/propertyFactory'
import maintRequestFactory from '@/backend/MaintRequestFactory'
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
  maintRequestFactory.setDatabase(database)
  userFactory.setDatabase(database)
  propertyFactory.setDatabase(database)
  notificationsFactory.setDatabase(database)
}

maintRequestFactory.userFactory = userFactory
maintRequestFactory.notificationsFactory = notificationsFactory
maintRequestFactory.propertyFactory = propertyFactory

propertyFactory.userFactory = userFactory
propertyFactory.notificationsFactory = notificationsFactory

test('get Request by Id', () => {

  const mockRequest = {
    id:1,
    property_id:1,
    creator_id:2,
    created_date:"2018-04-26T04:00:00.000Z",
    title:"Building Burned Down",
    description:"Sorry, No Idea.  It could just be the house settling",
    attached_files:null,
    worker_id:null,
    status:"open",
    landlord_id:1,
    worker_username:null,
    address:"1672 E117 St"
  }

  setUpMockDatabase([mockRequest])
  return maintRequestFactory.getRequestById(1).then(request => expect(request).toEqual(mockRequest));
});

test('Create Maintenance Request', () => {
  var mockRequest = {
    title: "mockRequest",
    description: "Mock Description",
    attachedFiles: [],
    worker_id: 1
  }
  setUpMockDatabase([{}])
  return maintRequestFactory.createRequest(mockRequest,1,1 ).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(3)
    expect(mockQuery.mock.calls.length).toEqual(3)
    expect(mockClose.mock.calls.length).toEqual(3)
  });
});

test('Delete a Maintenance Request', () => {

  setUpMockDatabase({})
  return maintRequestFactory.deleteRequest(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('test updating a Request', () => {
  const mockRequest = {
    title: 'mockTitle'
  }
  setUpMockDatabase([{}])
  return maintRequestFactory.editMaintRequest(mockRequest).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('test updating a status', () => {
  const mockRequest = {
    status: 'closed',
    creatorId: 'creatorId'
  }
  const resp = {
    creator_id: 1,
    landlord_id: 2,
    worker_id: 3
  }
  setUpMockDatabase([resp])
  return maintRequestFactory.updateStatus(1, mockRequest).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(6)
    expect(mockQuery.mock.calls.length).toEqual(6)
    expect(mockClose.mock.calls.length).toEqual(6)
  });
});

test('Test add Comment For Request', () => {
  var mockRequest = {}
  var mockComment = {}
  return maintRequestFactory.updateStatus(mockRequest, mockComment, false).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(5)
    expect(mockQuery.mock.calls.length).toEqual(5)
    expect(mockClose.mock.calls.length).toEqual(5)
  });
})

test('Assign Worker To Request', () => {
  let requestId = 1;
  let request = {
    worker: 2,
    creatorId: 1,
  }
  return maintRequestFactory.assign(requestId, request).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(3)
    expect(mockQuery.mock.calls.length).toEqual(3)
    expect(mockClose.mock.calls.length).toEqual(3)
  })
})

test('Get Comments For Request', () => {
  let requestId = 1;
  let mockComments = [
    {
      request_id: 1,
      username: 'mockUser',
      creator_id: 1,
      role: 1,
      comment_text: 'mockComment'
    }
  ]
  let expectedComments = [
    {
      request_id: 1,
      username: 'mockUser',
      creator_id: 1,
      role: 'tenant',
      comment_text: 'mockComment'
    }
  ]
  setUpMockDatabase(mockComments)
  return maintRequestFactory.getCommentsByRequestId(requestId).then(comments => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
    expect(comments).toEqual(expectedComments)
  })
})

test('Test Getting Status for int', () => {
  var mockRequest = { status: 1}
  var newStatus = maintRequestFactory.convertIntToStatus(mockRequest)
    expect(newStatus).toEqual('open')
});

test('Test Getting Int for Status', () => {
  var mockRequest = { status: 'open'}
  var newStatus = maintRequestFactory.convertStatusToInt(mockRequest)
    expect(newStatus).toEqual(1)
});
