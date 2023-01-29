import getters from "@/store/getters";
import { createDegree, createJob, createState } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const jobs = [
        createJob({ organization: "Meta" }),
        createJob({ organization: "Meta" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(state);

      expect(result).toEqual(new Set(["Meta"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Remote" }),
        createJob({ jobType: "Remote" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);

      expect(result).toEqual(new Set(["Remote"]));
    });
  });

  describe("UNIQUE_DEGREES", () => {
    it("extracts unique degree values", () => {
      const degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const state = createState({ degrees });
      const result = getters.UNIQUE_DEGREES(state);
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("displays jobs filtered by skills search term", () => {
      const jobs = [
        createJob({ title: "Vue Developer" }),
        createJob({ title: "React Developer" }),
      ];
      const skillsSearchTerm = "vue";
      const state = createState({ jobs, skillsSearchTerm });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([createJob({ title: "Vue Developer" })]);
    });

    it("displays jobs filtered by organization", () => {
      const jobs = [
        createJob({ organization: "Apple" }),
        createJob({ organization: "Netflix" }),
      ];
      const selectedOrganizations = ["Apple"];
      const state = createState({ jobs, selectedOrganizations });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([createJob({ organization: "Apple" })]);
    });

    it("displays jobs filtered by job type", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Remote" }),
      ];
      const selectedJobTypes = ["Remote"];
      const state = createState({ jobs, selectedJobTypes });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([createJob({ jobType: "Remote" })]);
    });

    it("displays jobs filtered by degree", () => {
      const jobs = [
        createJob({ degree: "Associate" }),
        createJob({ degree: "Master's" }),
      ];
      const selectedDegrees = ["Associate"];
      const state = createState({ jobs, selectedDegrees });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([createJob({ degree: "Associate" })]);
    });

    it("displays jobs filtered by skillsSearchTerm, organization, job type, and degree", () => {
      const jobs = [
        createJob({
          organization: "Meta",
          jobType: "Intern",
          degree: "Master's",
          title: "Angular Developer",
        }),
        createJob({
          organization: "Meta",
          jobType: "Part-time",
          degree: "Associate",
          title: "React Developer",
        }),
        createJob({
          title: "Vue Developer",
          organization: "Amazon",
          jobType: "Part-time",
          degree: "Master's",
        }),
        createJob({
          organization: "Amazon",
          jobType: "Intern",
          degree: "Bachelor's",
          title: "Svelte Developer",
        }),
      ];
      const skillsSearchTerm = "Vue";
      const selectedJobTypes = ["Part-time"];
      const selectedOrganizations = ["Amazon"];
      const selectedDegrees = ["Master's"];
      const state = createState({
        jobs,
        skillsSearchTerm,
        selectedJobTypes,
        selectedOrganizations,
        selectedDegrees,
      });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([
        createJob({
          organization: "Amazon",
          jobType: "Part-time",
          degree: "Master's",
          title: "Vue Developer",
        }),
      ]);
    });

    it("displays all jobs when user does not provide any filter", () => {
      const jobs = [
        createJob({ organization: "Meta", jobType: "Intern" }),
        createJob({ organization: "Amazon", jobType: "Part-time" }),
      ];
      const skillsSearchTerm = "";
      const selectedJobTypes: string[] = [];
      const selectedOrganizations: string[] = [];
      const state = createState({
        jobs,
        skillsSearchTerm,
        selectedJobTypes,
        selectedOrganizations,
      });
      const filteredJobs = getters.FILTERED_JOBS(state);

      expect(filteredJobs).toEqual([
        createJob({ organization: "Meta", jobType: "Intern" }),
        createJob({ organization: "Amazon", jobType: "Part-time" }),
      ]);
    });
  });
});
