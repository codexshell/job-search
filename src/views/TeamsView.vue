<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>

    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        It's awesome working here, whey don't you come join us
      </h2>
    </template>
  </header-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

export default defineComponent({
  name: "TeamsView",
  components: {
    HeaderContainer,
  },
});
</script>
