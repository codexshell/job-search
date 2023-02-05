const jobs = [1, 2, 3, 4, 5, 6];

const jobTypes = [1, 2, 3];

const filterJobs = (jobs: number[]) =>
  jobs.filter((job) => jobTypes.includes(job));

const filteredJobs = filterJobs(jobs); // ?
