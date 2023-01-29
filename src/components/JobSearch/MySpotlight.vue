<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import { ref } from "vue";
import { onBeforeMount } from "vue";

type Spotlight = {
  id: number;
  img: string;
  title: string;
  description: string;
};

export default defineComponent({
  name: "MySpotlight",
  setup() {
    const spotlights = ref<Spotlight[]>([]);
    const baseUrl = process.env.VUE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;
    onBeforeMount(async () => {
      const response = await axios.get<Spotlight[]>(url);
      spotlights.value = response.data;
    });

    return { spotlights };
  },
});
</script>
