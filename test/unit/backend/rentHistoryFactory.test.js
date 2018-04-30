import rentHistoryFactory from '@/backend/rentHistoryFactory'
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
  rentHistoryFactory.setDatabase(database)
}

test('get Rent History Entry by Id', () => {

  const mockEntry = {
    id: 1,
    payer_id: 1,
    property_id: 1,
    payment_date: 728332734,
    payment_amount: 7357,
    on_time: true
  }

  setUpMockDatabase([mockEntry])
  return rentHistoryFactory.getEntryById(1).then(entry => expect(entry).toEqual(mockEntry));
});

test('Create Entry', () => {
  var mockEntry = {
    payer_id: 1,
    property_id: 1,
    payment_date: 728332734,
    payment_amount: 7357,
    on_time: true
  }
  setUpMockDatabase([{}])
  return rentHistoryFactory.createEntry(mockEntry).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Delete an Entry', () => {

  setUpMockDatabase([{}])
  return rentHistoryFactory.deleteEntry(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('Delete an Entry', () => {

  setUpMockDatabase([{}])
  return rentHistoryFactory.deleteEntry(1).then(() => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
  });
});

test('edit entry calls db correctly', () => {
  var mockEditEntry = {
    id: 1,
    payerId: 1,
    propertyId: 1,
    paymentDate: 728332734,
    paymentAmount: 7357,
    onTime: true
  }
setUpMockDatabase([mockEditEntry])
  return rentHistoryFactory.editEntry(mockEditEntry).then(() => {

  });
});

test('can get entries for user', () => {
  var mockEntry = {
    payer_id: 1,
    property_id: 1,
    payment_date: 728332734,
    payment_amount: 7357,
    on_time: true
  }
  var mockEntry1 = {
    payer_id: 1,
    property_id: 2,
    payment_date: 728342734,
    payment_amount: 7357,
    on_time: true
  }
  var mockEntry2 = {
    payerId: 2,
    propertyId: 1,
    paymentDate: 728352734,
    paymentAmount: 7357,
    onTime: true
  }
  setUpMockDatabase([mockEntry, mockEntry1])
  return rentHistoryFactory.getEntriesForUser(1).then( entries => {
    expect(mockOpen.mock.calls.length).toEqual(1)
    expect(mockQuery.mock.calls.length).toEqual(1)
    expect(mockClose.mock.calls.length).toEqual(1)
    expect(entries).toContain(mockEntry)
    expect(entries).toContain(mockEntry1)
  });
});

  test('can get entries for property', () => {
    var mockEntry = {
      payer_id: 1,
      property_id: 1,
      payment_date: 728332734,
      payment_amount: 7357,
      on_time: true
    }
    var mockEntry1 = {
      payer_id: 1,
      property_id: 2,
      payment_date: 728342734,
      payment_amount: 7357,
      on_time: true
    }
    var mockEntry2 = {
      payerId: 2,
      propertyId: 1,
      paymentDate: 728352734,
      paymentAmount: 7357,
      onTime: true
    }
    setUpMockDatabase([mockEntry, mockEntry1])
    return rentHistoryFactory.getEntriesForProperty(1).then( entries => {
      expect(mockOpen.mock.calls.length).toEqual(1)
      expect(mockQuery.mock.calls.length).toEqual(1)
      expect(mockClose.mock.calls.length).toEqual(1)
      expect(entries).toContain(mockEntry)
      expect(entries).toContain(mockEntry1)
    });
});
