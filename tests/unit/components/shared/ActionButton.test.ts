import { mount } from "@vue/test-utils";
import ActionButton from "@/components/shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm so clickable",
        type: "primary",
      },
    });

    expect(wrapper.text()).toMatch("I'm so clickable");
  });

  it("it applies on of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm also clickable",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
