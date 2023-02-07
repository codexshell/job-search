import { shallowMount, RouterLinkStub } from "@vue/test-utils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));
jest.mock("vuex");
import { useStore } from "vuex";
const useStoreMock = useStore as jest.Mock;

import MainNav from "@/components/Navigation/MainNav.vue";
import { GlobalState } from "@/store/types";

type Store = {
  state: Partial<GlobalState>;
};

describe("MainNav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays the company name", () => {
    useStoreMock.mockReturnValue({
      state: {
        isLoggedIn: false,
      },
    });

    const wrapper = shallowMount(MainNav, createConfig());

    expect(wrapper.text()).toMatch(/Codex Careers/);
  });

  it("displays menu items for Navigation", () => {
    useStoreMock.mockReturnValue({
      state: {
        isLoggedIn: false,
      },
    });

    const wrapper = shallowMount(MainNav, createConfig());
    const NavigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const NavigationMenuTexts = NavigationMenuItems.map((item) => item.text());

    expect(NavigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Codex",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const $store = {
        state: {
          isLoggedIn: false,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig());
      const logInButton = wrapper.find("[data-test='login-button']");
      expect(logInButton.exists()).toBe(true);
    });

    it("issues call to vuex to log in user", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({
        state: {
          isLoggedIn: false,
        },
        commit,
      });

      const wrapper = shallowMount(MainNav, createConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });

  describe("when user is logged in", () => {
    it("display user profile picture", () => {
      useStoreMock.mockReturnValue({
        state: {
          isLoggedIn: true,
        },
      });

      const wrapper = shallowMount(MainNav, createConfig());
      const profileImage = wrapper.find("[data-test='profile-image'] ");

      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-Navigation menu with additional information", () => {
      useStoreMock.mockReturnValue({
        state: {
          isLoggedIn: true,
        },
      });

      const wrapper = shallowMount(MainNav, createConfig());
      const subnav = wrapper.find("[data-test='sub-nav']");

      expect(subnav.exists()).toBe(true);
    });
  });
});
