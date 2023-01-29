import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useFetchJobsDispatch,
  useUniqueDegrees,
  useFetchDegreesDispatch,
} from "@/store/composables";
import {
  FETCH_DEGREES,
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_DEGREES,
} from "@/store/constants";

jest.mock("axios", () => ({
  get: jest.fn(),
}));
const useStoreMock = useStore as jest.Mock;

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          [FILTERED_JOBS]: [{ id: 1 }],
        },
      });

      const filteredJobs = useFilteredJobs();
      expect(filteredJobs.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves 'UNIQUE_JOB_TYPES' from store getters", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const uniqueJobs = useUniqueJobTypes();
      expect(uniqueJobs.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("useUniqueOrganizations", () => {
    it("retrieves 'UNIQUE_ORGANIZATIONS' from store getters", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["VueMastery"]),
        },
      });

      const uniqueJobOrganizations = useUniqueOrganizations();
      expect(uniqueJobOrganizations.value).toEqual(new Set(["VueMastery"]));
    });
  });

  describe("useUniqueDegrees", () => {
    it("retrieves 'UNIQUE_DEGREES' from store getters", () => {
      useStoreMock.mockReturnValue({
        getters: {
          [UNIQUE_DEGREES]: ["Associate"],
        },
      });

      expect(useUniqueDegrees().value).toEqual(["Associate"]);
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("sends call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });
      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith(FETCH_JOBS);
    });
  });

  describe("useFetchDegreesDispatch", () => {
    it("sends call to fetch degrees from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });
      useFetchDegreesDispatch();
      expect(dispatch).toHaveBeenCalledWith(FETCH_DEGREES);
    });
  });
});
