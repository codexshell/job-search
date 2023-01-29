import actions from "@/store/actions";
import getJobs from "@/api/getJobs";
import getDegrees from "@/api/getDegrees";
import { RECEIVE_DEGREES, RECEIVE_JOBS } from "@/store/constants";

jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("@/api/getJobs");
const getJobsMock = getJobs as jest.Mock;
jest.mock("@/api/getDegrees");
const getDegreesMock = getDegrees as jest.Mock;

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });

    it("makes request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save received jobs in store", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(context.commit).toHaveBeenCalledWith(RECEIVE_JOBS, [
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
  });

  describe("FETCH_DEGREES", () => {
    beforeEach(() => {
      getDegreesMock.mockResolvedValue([
        {
          id: 1,
          title: "Master's",
        },
      ]);
    });

    it("makes request to fetch degrees", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_DEGREES(context);
      expect(getDegreesMock).toHaveBeenCalled();
    });

    it("sends message to save received degrees in store", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_DEGREES(context);
      expect(context.commit).toHaveBeenCalledWith(RECEIVE_DEGREES, [
        {
          id: 1,
          title: "Master's",
        },
      ]);
    });
  });
});
