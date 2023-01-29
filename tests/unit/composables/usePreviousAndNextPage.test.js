import usePreviousAndNextPages from "@/composables/usePreviousAndNextPage";

describe("usePreviousAndNextPages", () => {
  it("calculates and returns page before current one", () => {
    const currentPage = { value: 8 };
    const lastPage = { value: 10 };
    const { previousPage } = usePreviousAndNextPages(currentPage, lastPage);
    const result = previousPage.value;

    expect(result).toBe(7);
  });
  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = { value: 1 };
      const lastPage = { value: 10 };
      const { previousPage } = usePreviousAndNextPages(currentPage, lastPage);
      const result = previousPage.value;

      expect(result).toBeNull();
    });
    it("calculates and returns page after current one", () => {
      const currentPage = { value: 8 };
      const lastPage = { value: 10 };
      const { nextPage } = usePreviousAndNextPages(currentPage, lastPage);
      const result = nextPage.value;

      expect(result).toBe(9);
    });
  });
  describe("when current page is the last page", () => {
    it("does provide previous page", () => {
      const currentPage = { value: 10 };
      const lastPage = { value: 10 };
      const { previousPage } = usePreviousAndNextPages(currentPage, lastPage);
      const result = previousPage.value;

      expect(result).toBe(9);
    });
    it("does not return next page", () => {
      const currentPage = { value: 10 };
      const lastPage = { value: 10 };
      const { nextPage } = usePreviousAndNextPages(currentPage, lastPage);
      const result = nextPage.value;

      expect(result).toBeNull();
    });
  });
});
