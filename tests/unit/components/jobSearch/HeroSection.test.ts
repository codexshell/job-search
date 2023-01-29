import HeroSection from "@/components/JobSearch/HeroSection.vue";
import { shallowMount } from "@vue/test-utils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("HeroSection", () => {
  it("renders", () => {
    const wrapper = shallowMount(HeroSection, {
      global: {
        stubs: ["router-link"],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
