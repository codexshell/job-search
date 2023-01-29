import { shallowMount } from "@vue/test-utils";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("vuex");
jest.mock("vue-router");

const useStoreMock = useStore as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

import JobFiltersSideBarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

describe("JobFiltersSideBarJobTypes", () => {
  const createConfig = (props = {}) => ({
    props: {
      uniqueValues: new Set(["value a", "value b"]),
      mutation: "random mutation",
      ...props,
    },
  });

  it("renders checkboxes each with a unique job type label", async () => {
    useStoreMock.mockReturnValue({ subscribe: jest.fn() });
    const uniqueValues = new Set(["Full-time", "Part-time"]);
    const props = { uniqueValues };

    const wrapper = shallowMount(
      JobFiltersSideBarCheckboxGroup,
      createConfig(props)
    );
    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());

    expect(inputValues).toEqual(["Full-time", "Part-time"]);
  });

  describe("when a user clicks a checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn });
      useRouterMock.mockReturnValue({ push: jest.fn() });
      const uniqueValues = new Set(["full-time"]);
      const mutation = "update job type";
      const config = {
        uniqueValues,
        mutation,
      };

      const wrapper = shallowMount(
        JobFiltersSideBarCheckboxGroup,
        createConfig(config)
      );
      const fullTimeInput = wrapper.find("[data-test='full-time']");
      await fullTimeInput.setValue(true);

      expect(commit).toHaveBeenCalledWith("update job type", ["full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
      const push = jest.fn();
      useRouterMock.mockReturnValue({
        push,
      });

      const wrapper = shallowMount(
        JobFiltersSideBarCheckboxGroup,
        createConfig()
      );
      const fullTimeInput = wrapper.find("[data-test='value a']");
      await fullTimeInput.setValue(true);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
