import { flushPromises, RouterLinkStub, shallowMount } from "@vue/test-utils";
import { ref } from "vue";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

import JobListings from "@/components/JobResults/JobListings.vue";
import {
  useFetchJobsDispatch,
  useFetchDegreesDispatch,
  useFilteredJobs,
} from "@/store/composables";
jest.mock("@/store/composables");
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");
const useCurrentPageMock = useCurrentPage as jest.Mock;

import usePreviousAndNextPage from "@/composables/usePreviousAndNextPage";
jest.mock("@/composables/usePreviousAndNextPage");
const usePreviousAndNextPageMock = usePreviousAndNextPage as jest.Mock;

describe("JobListings", () => {
  const createConfig = ($route?: Object, $store?: Object) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: 3,
      });

      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled;
    });

    it("makes call to fetch degrees from API", () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: 3,
      });

      shallowMount(JobListings, createConfig());
      expect(useFetchDegreesDispatch).toHaveBeenCalled;
    });
  });

  it("creates a maximum of 10 JobListing components", async () => {
    useFilteredJobsMock.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPageMock.mockReturnValue({ value: 2 });
    usePreviousAndNextPageMock.mockReturnValue({
      previousPage: 1,
      nextPage: 3,
    });

    const wrapper = shallowMount(JobListings, createConfig());

    await flushPromises();
    expect(
      wrapper.findAll("[data-test='job-listing']").length
    ).toBeLessThanOrEqual(10);
  });

  it("displays page number", () => {
    useFilteredJobsMock.mockReturnValue({ value: [] });
    useCurrentPageMock.mockReturnValue(ref(5));
    usePreviousAndNextPageMock.mockReturnValue({
      previousPage: 4,
      nextPage: 6,
    });

    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 1 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: null,
        nextPage: 2,
      });

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: 3,
      });

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("shows link to previous page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: null,
      });

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");

      expect(previousPage.exists()).toBe(true);
    });

    it("does not show link to next page", async () => {
      useFilteredJobsMock.mockReturnValue({ value: [] });
      useCurrentPageMock.mockReturnValue({ value: 2 });
      usePreviousAndNextPageMock.mockReturnValue({
        previousPage: 1,
        nextPage: null,
      });

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });
  });
});
