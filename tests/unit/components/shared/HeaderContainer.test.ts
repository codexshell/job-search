import { mount } from "@vue/test-utils";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const createConfig = (config = {}) => ({
    ...config,
  });

  it("allows parent component to provide a title", () => {
    const title = "<h1>Test Title</h1>";
    const slots = {
      title,
    };
    const config = {
      slots,
    };
    const wrapper = mount(HeaderContainer, createConfig(config));

    expect(wrapper.text()).toMatch("Test Title");
  });

  it("allows parent component to provide subtitle content", () => {
    const subtitle = "<h2>Test Subtitle</h2>";
    const slots = {
      subtitle,
    };
    const config = {
      slots,
    };
    const wrapper = mount(HeaderContainer, createConfig(config));

    expect(wrapper.text()).toMatch("Test Subtitle");
  });
});
