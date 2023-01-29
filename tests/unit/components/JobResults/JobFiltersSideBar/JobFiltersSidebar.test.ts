import { shallowMount } from "@vue/test-utils";

jest.mock("vuex");
jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("@/store/composables");

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import { useRoute } from "vue-router";
jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;

import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";

describe("JobFiltersSidebar", () => {
  it("sets up panel for user to filter jobs by one or more criteria", () => {
    useStoreMock.mockReturnValue({
      commit: jest.fn(),
    });
    useRouteMock.mockReturnValue({
      query: {},
    });

    const wrapper = shallowMount(JobFiltersSidebar);

    expect(wrapper.exists()).toBe(true);
  });

  it("reads query params to filter initial jobs for user", () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      commit,
    });
    const role = "Vue";
    useRouteMock.mockReturnValue({
      query: {
        role,
      },
    });

    shallowMount(JobFiltersSidebar);

    expect(commit).toHaveBeenCalledWith(UPDATE_SKILLS_SEARCH_TERM, role);
  });
});
