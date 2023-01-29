import { mount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

jest.mock("axios", () => ({
  get: jest.fn(),
}));
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";

describe("JobFiltersSidebarPrompt", () => {
  describe("when user clicks 'Clear Filter' button", () => {
    it("sends mesasge to clear all users jobs filters", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({
        commit,
      });

      const wrapper = mount(JobFiltersSidebarPrompt);
      const button = wrapper.find("[data-test='clear-job-filters']");
      await button.trigger("click");

      expect(commit).toHaveBeenCalledWith("CLEAR_USER_JOB_FILTER_SELECTIONS");
    });
  });
});
