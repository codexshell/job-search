<template>
  <section class="mb-16">
    <h1
      class="mb-14 text-8xl font-bold tracking-tighter"
      data-test="action-phrase"
    >
      <span :class="actionClass">{{ action }}</span
      ><br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Codex Corp</h2>
  </section>
</template>

<script setup lang="ts">
import nextElementInList from "@/utils/nextElementInList";
import { reactive, computed, onBeforeMount, onBeforeUnmount, toRef } from "vue";

type ActionClass = {
  [x: string]: boolean;
};

type Data = {
  action: string;
  interval?: number;
};

const state = reactive<Data>({
  action: "Build",
  interval: undefined,
});

const actionClass = computed<ActionClass>(() => ({
  [state.action.toLowerCase()]: true,
}));
const changeTitle = () => {
  state.interval = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    state.action = nextElementInList(actions, state.action);
  }, 3000);
};

onBeforeMount(changeTitle);
onBeforeUnmount(() => clearInterval(state.interval));
const action = toRef(state, "action");
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
