import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";
import { Job } from "@/api/types";
import { createJob } from "../../store/utils";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      job: {
        ...job,
      },
    },
  });

  it("renders a job title", () => {
    const jobProps = createJob({ title: "Vue Developer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Developer");
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Vue Mastery" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Mastery");
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Remote", "USA"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Remote");
    expect(wrapper.text()).toMatch("USA");
  });

  it("renders job qualifications", () => {
    const jobProps = createJob({
      minimumQualifications: ["Vue", "JavaScript"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue");
    expect(wrapper.text()).toMatch("JavaScript");
  });

  it("links to the job details page", () => {
    const jobProps = createJob({ id: 123 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual(
      "/jobs/results/123"
    );
  });
});
