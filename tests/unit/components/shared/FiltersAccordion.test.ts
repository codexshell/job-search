import { mount } from "@vue/test-utils";

import FilterAccordion from "@/components/shared/FiltersAccordion.vue";

describe("FilterAccordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: ["FontAwesomeIcon"],
    },
    props: {
      header: "Test Header",
    },
    ...config,
  });

  it("renders child", async () => {
    const slots = {
      default: "<h3>My nested child</h3>",
    };
    const config = { slots };
    const wrapper = mount(FilterAccordion, createConfig(config));

    expect(wrapper.text()).not.toMatch("My nested child");

    const accordionHeader = wrapper.find("[data-test='accordion-header']");
    await accordionHeader.trigger("click");

    expect(wrapper.text()).toMatch("My nested child");
  });

  describe("when we do not provide custom child content", () => {
    const slots = { default: "" };
    const config = { slots };

    it("renders default content", async () => {
      const wrapper = mount(FilterAccordion, createConfig(config));

      const accordionHeader = wrapper.find("[data-test='accordion-header']");
      await accordionHeader.trigger("click");

      expect(wrapper.text()).toMatch("Empty Slot");
    });
  });
});
