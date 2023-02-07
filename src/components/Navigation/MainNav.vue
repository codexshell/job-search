<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >Codex Careers</router-link
        >
        <nav class="ml-12 h-full">
          <ul class="m-0 flex h-full list-none gap-9 p-0">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
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

<script setup lang="ts">
import { reactive, computed, toRef } from "vue";
import { useStore } from "vuex";
import { key } from "@/store/index";

import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

const store = useStore(key);

const state = reactive({
  menuItems: [
    { text: "Teams", url: "/teams" },
    { text: "Locations", url: "/" },
    { text: "Life at Codex", url: "/" },
    { text: "How we hire", url: "/" },
    { text: "Students", url: "/" },
    { text: "Jobs", url: "/jobs/results" },
  ],
});

const headerHeightClass = computed(() => {
  return {
    "h-16": !store.state.isLoggedIn,
    "h-32": store.state.isLoggedIn,
  };
});
const isLoggedIn = computed(() => store.state.isLoggedIn);
const LOGIN_USER = () => store.commit("LOGIN_USER");

const menuItems = toRef(state, "menuItems");
</script>
