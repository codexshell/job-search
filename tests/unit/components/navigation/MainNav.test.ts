import { shallowMount, RouterLinkStub } from "@vue/test-utils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

import MainNav from "@/components/Navigation/MainNav.vue";
import { GlobalState } from "@/store/types";

type Store = {
  state: Partial<GlobalState>;
};

describe("MainNav", () => {
  const createConfig = ($store: Store) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays the company name", () => {
    const $store = {
      state: {
        isLoggedIn: false,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig($store));
    expect(wrapper.text()).toMatch(/Codex Careers/);
  });

  it("displays menu items for Navigation", () => {
    const $store = {
      state: {
        isLoggedIn: false,
      },
    };
    const wrapper = shallowMount(MainNav, createConfig($store));
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
      const wrapper = shallowMount(MainNav, createConfig($store));
      const logInButton = wrapper.find("[data-test='login-button']");
      expect(logInButton.exists()).toBe(true);
    });

    it("issues call to vuex to log in user", async () => {
      const commit = jest.fn();
      const $store = {
        state: {
          isLoggedIn: false,
        },
        commit,
      };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const loginButton = wrapper.find("[data-test='login-button']");

      await loginButton.trigger("click");
      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });

  describe("when user is logged in", () => {
    it("display user profile picture", () => {
      const $store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig($store));
      const profileImage = wrapper.find("[data-test='profile-image'] ");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays sub-Navigation menu with additional information", () => {
      const $store = {
        state: {
          isLoggedIn: true,
        },
      };
      const wrapper = shallowMount(MainNav, createConfig($store));

      const subnav = wrapper.find("[data-test='sub-nav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});
