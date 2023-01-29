import { Job } from "@/api/types";
import {
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  FILTERED_JOBS,
  UNIQUE_DEGREES,
} from "@/store/constants";
import { GlobalState } from "@/store/types";

export const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOrganizations = new Set<string>();

    for (const job of state.jobs) {
      uniqueOrganizations.add(job.organization);
    }

    return uniqueOrganizations;
  },

  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const uniqueJobTypes = new Set<string>();

    for (const job of state.jobs) {
      uniqueJobTypes.add(job.jobType);
    }

    return uniqueJobTypes;
  },

  [UNIQUE_DEGREES](state: GlobalState) {
    return state.degrees.map(({ degree }) => degree);
  },

  [FILTERED_JOBS](state: GlobalState) {
    const filterByJobTypes = (jobs: Job[]) =>
      state.selectedJobTypes.length !== 0
        ? jobs.filter(({ jobType }) => state.selectedJobTypes.includes(jobType))
        : jobs;

    const filterByOrganizations = (jobs: Job[]) =>
      state.selectedOrganizations.length !== 0
        ? jobs.filter(({ organization }) =>
            state.selectedOrganizations.includes(organization)
          )
        : jobs;

    const filterByDegrees = (jobs: Job[]) =>
      state.selectedDegrees.length !== 0
        ? jobs.filter(({ degree }) => state.selectedDegrees.includes(degree))
        : jobs;

    const filterBySkillsSearchTerm = (jobs: Job[]) =>
      state.skillsSearchTerm !== ""
        ? jobs.filter(({ title }) =>
            title.toLowerCase().includes(state.skillsSearchTerm.toLowerCase())
          )
        : jobs;

    let result = filterByDegrees(state.jobs);
    result = filterBySkillsSearchTerm(result);
    result = filterByJobTypes(result);
    result = filterByOrganizations(result);

    return result;
  },
};

export default getters;
