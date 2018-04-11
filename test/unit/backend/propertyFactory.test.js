import propertyFactory from '@/backend/propertyFactory'
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
  propertyFactory.setDatabase(database)
}

test('get Property by Id', () => {
  const mockProperty = {
    id : 1,
    landlord_id : 2,
    address: '123 Mock Strt',
    rent: 420,
    late_fee: 25
  }

  setUpMockDatabase(mockProperty)
  return propertyFactory.getPropertyById(1).then(property => expect(property).toEqual(mockProperty));
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

test('Delete a Property', () => {

  setUpMockDatabase({})
  return propertyFactory.deleteProperty(2).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});
