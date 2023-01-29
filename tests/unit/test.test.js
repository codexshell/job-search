function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

// mock forEach function
const mockCallBack = jest.fn((x) => 42 + x);

describe("mockCallBack", () => {
  beforeAll(() => forEach([0, 1], mockCallBack));

  it("is called twice", () => {
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  describe("first argument of the first call", () => {
    it("is 0", () => {
      expect(mockCallBack.mock.calls[0][0]).toBe(0);
    });
  });

  describe("first argument of the second call", () => {
    it("is 1", () => {
      expect(mockCallBack.mock.calls[1][0]).toBe(1);
    });
  });

  describe("the return value of the first call", () => {
    it("is 43", () => {
      expect(mockCallBack.mock.results[0].value).toBe(42);
    });
  });

  describe("the return value of the second call", () => {
    it("is 43", () => {
      expect(mockCallBack.mock.results[1].value).toBe(43);
    });
  });
});
