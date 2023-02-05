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

<script lang="ts">
import { defineComponent } from "vue";
import nextElementInList from "@/utils/nextElementInList";

type ActionClass = {
  [x: string]: boolean;
};

type Data = {
  action: string;
  interval?: number;
};

export default defineComponent({
  name: "HeadLine",
  data(): Data {
    return {
      action: "Build",
      interval: undefined,
    };
  },
  computed: {
    actionClass(): ActionClass {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
});
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
