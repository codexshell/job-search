import { shallowMount } from "@vue/test-utils";
import { useUniqueJobTypes } from "@/store/composables";

jest.mock("vuex");
jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("@/store/composables");
const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;

import JobFiltersSidebarJobTypesVue from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  it("allows user to filter jobs by job types", () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(["Job Types"]));

    const wrapper = shallowMount(JobFiltersSidebarJobTypesVue);
    const jobTypeFilters = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });
    const { uniqueValues, mutation } = jobTypeFilters.props();

    expect(uniqueValues).toEqual(new Set(["Job Types"]));
    expect(mutation).toBe("ADD_SELECTED_JOB_TYPES");
  });
});
