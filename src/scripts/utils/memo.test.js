import memo from './memo';

describe('Memoizer', () => {
  test('returns the same as origial', () => {
    const myMock = jest.fn((n) => n + 42);
    const memoizedMock = memo(myMock);

    expect(myMock(0)).toBe(memoizedMock(0));
    expect(myMock('m')).toBe(memoizedMock('m'));
  });

  test('doesn\'t call original twice with same arg', () => {
    const myMock = jest.fn((n) => n + 42);
    const memoizedMock = memo(myMock);

    memoizedMock(4);
    memoizedMock(4);
    memoizedMock('mamamia');

    expect(myMock.mock.calls.length).toBe(2);
    expect(myMock.mock.calls[0][0]).toBe(4);
    expect(myMock.mock.calls[1][0]).toBe('mamamia');
    expect(myMock.mock.results[0].value).toBe(46);
    expect(myMock.mock.results[1].value).toBe('mamamia42');
  });
});
