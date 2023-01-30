<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center h-full text-xl"
          >Codex Careers</router-link
        >
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none gap-9">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <action-button
            v-if="!isLoggedIn"
            data-test="login-button"
            type="primary"
            text="Sign in"
            @click="LOGIN_USER()"
          />
          <profile-image v-else data-test="profile-image" />
        </div>
      </div>

      <sub-nav v-if="isLoggedIn" data-test="sub-nav" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

import { LOGIN_USER } from "@/store/constants";

export default defineComponent({
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/teams" },
        { text: "Locations", url: "/" },
        { text: "Life at Codex", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/jobs/results" },
      ],
    };
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapMutations([LOGIN_USER]),
  },
});
</script>
