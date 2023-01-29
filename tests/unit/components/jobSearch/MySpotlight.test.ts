import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

import MySpotlight from "@/components/JobSearch/MySpotlight.vue";

const axiosGetMock = axios.get as jest.Mock;

describe("MySpotlight", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          img: "url-to-some-image",
          title: "Image Title",
          description: "Image description",
        },
      ],
    });
  });

  const createConfig = (config: Object) => ({
    slots: {},
    ...config,
  });

  it("provides img props to parent component", async () => {
    const slots = {
      default: `<template #default="slotProps">
        <span>{{ slotProps.img }}</span>
        </template>`,
    };
    const config = {
      slots,
    };
    const wrapper = mount(MySpotlight, createConfig(config));

    await flushPromises();

    expect(wrapper.text()).toMatch("url-to-some-image");
  });

  it("provides title props to parent component", async () => {
    const config = {
      slots: {
        default: `<template #default="slotProps">
            <span>{{ slotProps.title }}</span>
          </template>`,
      },
    };
    const wrapper = mount(MySpotlight, createConfig(config));

    await flushPromises();

    expect(wrapper.text()).toMatch("Image Title");
  });

  it("provides description props to parent component", async () => {
    const slots = {
      default: `<template #default="slotProps">
        <span>{{ slotProps.description }}</span>
      </template>`,
    };
    const config = {
      slots,
    };
    const wrapper = mount(MySpotlight, createConfig(config));

    await flushPromises();

    expect(wrapper.text()).toMatch("Image description");
  });
});
