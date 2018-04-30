import userFactory from '@/backend/userFactory'
import propertyFactory from '@/backend/propertyFactory'
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
  propertyFactory.setDatabase(database)
  userFactory.setDatabase(database)
  notificationsFactory.setDatabase(database)
}

propertyFactory.userFactory = userFactory
propertyFactory.notificationsFactory = notificationsFactory

test('get Property by Id', () => {
  const mockProperty = {
    id : 1,
    landlord_id : 2,
    address: '123 Mock Strt',
    rent: 420,
    late_fee: 25
  }

  setUpMockDatabase([mockProperty])
  return propertyFactory.getPropertyById(1).then(property => expect(property).toEqual(mockProperty));
});

test('get Available Properties', () => {
  const mockProperties = [
    {
      id : 1,
      landlord_id : 2,
      address: '123 Mock Strt',
      rent: 420,
      late_fee: 25
    },
    {
      id : 2,
      landlord_id : 3,
      address: '221B Baker Strt',
      rent: 600,
      late_fee: 50
    }
  ]

  setUpMockDatabase(mockProperties)
  return propertyFactory.getAvailableProperties().then(properties => {
    expect(properties).toContain(mockProperties[0]);
    expect(properties).toContain(mockProperties[1]);
  });
});

test('get Properties By Landlord Id', () => {
  const mockProperties = [
    {
      id : 1,
      landlord_id : 1,
      address: '123 Mock Strt',
      rent: 420,
      late_fee: 25
    },
    {
      id : 2,
      landlord_id : 1,
      address: '221B Baker Strt',
      rent: 600,
      late_fee: 50
    }
  ]

  setUpMockDatabase(mockProperties)
  return propertyFactory.getPropertiesByLandlordId(1).then(properties => {
    expect(properties).toContain(mockProperties[0]);
    expect(properties).toContain(mockProperties[1]);
  });
});

test('Create Property', () => {
  var mockProperty = {
    landlord_id : 2,
    address: '123 Mock Strt',
    rent: 420,
    late_fee: 25
  }
  setUpMockDatabase({})
  return propertyFactory.createProperty(mockProperty).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Edit A Property', () => {
  var mockProperty = {
    landlord_id : 2,
    address: '123 Mock Strt',
    rent: 420,
    late_fee: 25
  }
  setUpMockDatabase({})
  return propertyFactory.editProperty(1, mockProperty).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});


test('Delete a Property', () => {

  setUpMockDatabase({})
  return propertyFactory.deleteProperty(2).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Adding Tenant To A Property', () => {
  let mockTenantId = 1
  let mockPropertyId = 1
  setUpMockDatabase({})
  return propertyFactory.addTenant(mockTenantId, mockPropertyId).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(2)
    expect(mockQuery.mock.calls.length).toEqual(2)
    expect(mockClose.mock.calls.length).toEqual(2)
  });
});

test('Reject an Application Creates a Notification', () => {
  let applicationId = 1
  let resp = {
    applicant_id: 1,
    property_id:1
  }
  setUpMockDatabase([resp])
  return propertyFactory.rejectApplication(applicationId).then( () => {
    expect(mockOpen.mock.calls.length).toEqual(2)
    expect(mockQuery.mock.calls.length).toEqual(3)
    expect(mockClose.mock.calls.length).toEqual(2)
  });
});

test('Accept an Application', () => {
  let applicationId = 1
  let resp = {
    applicant_id: 1,
    property_id:1
  }
  setUpMockDatabase([resp])
  return propertyFactory.acceptApplication(applicationId).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});
