import { GlobalState } from "@/store/types";

export const state = (): GlobalState => {
  return {
    isLoggedIn: false,
    jobs: [],
    degrees: [],
    skillsSearchTerm: "",
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
  };
};

export default state;
