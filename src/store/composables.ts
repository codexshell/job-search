import { useStore } from "vuex";
import { key } from "@/store";
import {
  FETCH_DEGREES,
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_DEGREES,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from "@/store/constants";
import { computed } from "vue";
import { Job } from "@/api/types";

/* GETTERS */
const useFilteredJobs = () => {
  const store = useStore(key);
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]);
};

const useUniqueJobTypes = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
};

const useUniqueOrganizations = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

const useUniqueDegrees = () => {
  const store = useStore(key);
  return computed<string[]>(() => store.getters[UNIQUE_DEGREES]);
};

/* ACTIONS */
const useFetchJobsDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_JOBS);
};

const useFetchDegreesDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_DEGREES);
};

export {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useFetchJobsDispatch,
  useFetchDegreesDispatch,
  useUniqueDegrees,
};
