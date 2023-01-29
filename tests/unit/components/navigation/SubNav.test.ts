import { ref } from "vue";
import { mount } from "@vue/test-utils";
import useConfirmRoute from "@/composables/useConfirmRoute";
import { useFilteredJobs } from "@/store/composables";

jest.mock("vuex");
jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("@/composables/useConfirmRoute");
jest.mock("@/store/composables");

import SubNav from "@/components/Navigation/SubNav.vue";

const useConfirmRouteMock = useConfirmRoute as jest.Mock;
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

describe("SubNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when the user is on jobs page", () => {
    it("displays job count of 2", () => {
      useConfirmRouteMock.mockReturnValue(ref(true));
      useFilteredJobsMock.mockReturnValue(ref([{ id: 1 }, { id: 2 }]));

      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");

      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does NOT display job count", () => {
      useConfirmRouteMock.mockReturnValue(ref(false));
      useFilteredJobsMock.mockReturnValue(ref([]));

      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");

      expect(jobCount.exists()).toBe(false);
    });
  });
});
