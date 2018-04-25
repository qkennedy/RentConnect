import documentFactory from '@/backend/documentFactory'
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

  var database = new Database();
  documentFactory.setDatabase(database)
}

test('get document by Id', () => {

  const mockDoc = {
    id : 1,
    property_id: 1,
    created_date: 15,
    creator_id: 2,
    title: "mock Title",
    file: "C:/Mock/Mock.pdf"
  }

  setUpMockDatabase(mockDoc)
  return documentFactory.getDocumentById(1).then(doc => expect(doc).toEqual(mockDoc));
});

test('Create document', () => {
  var mockDoc = {
    title: "mock Title",
    file: "C:/Mock/Mock.pdf"
  }
  setUpMockDatabase({})
  return documentFactory.createDocument(1,2, mockDoc).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Delete a document', () => {

  setUpMockDatabase({})
  return documentFactory.deleteDocument(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});
