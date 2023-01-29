import { shallowMount } from "@vue/test-utils";

import { useUniqueDegrees } from "@/store/composables";

jest.mock("vuex");
jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("@/store/composables");
const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/jobFiltersSidebarDegrees.vue";

describe("JobFiltersSidebarDegree", () => {
  it("allows user to filter jobs by degrees", () => {
    useUniqueDegreesMock.mockReturnValue(["Associate"]);

    const wrapper = shallowMount(JobFiltersSidebarDegrees);
    const degreesFilter = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });
    const { uniqueValues, mutation } = degreesFilter.props();

    expect(uniqueValues).toEqual(["Associate"]);
    expect(mutation).toEqual("ADD_SELECTED_DEGREES");
  });
});
