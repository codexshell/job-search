import { Degree, Job } from "@/api/types";

export type GlobalState = {
  isLoggedIn: boolean;
  jobs: Job[];
  skillsSearchTerm: string;
  degrees: Degree[];
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
};
