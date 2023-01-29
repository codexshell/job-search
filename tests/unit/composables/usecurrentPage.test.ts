import { useRoute } from "vue-router";
jest.mock("vue-router");
import useCurrentPage from "@/composables/useCurrentPage";

const useRouteMock = useRoute as jest.Mock;

describe("useCurrentPage", () => {
  describe("when query params include a page", () => {
    it("returns the page number", () => {
      useRouteMock.mockReturnValue({
        query: {
          page: "5",
        },
      });
      const result = useCurrentPage().value;

      expect(result).toBe(5);
    });
  });

  describe("when query params does not include page", () => {
    describe("defaults to page 1", () => {
      it("returns 1", () => {
        useRouteMock.mockReturnValue({ query: {} });
        const result = useCurrentPage().value;

        expect(result).toBe(1);
      });
    });
  });
});
