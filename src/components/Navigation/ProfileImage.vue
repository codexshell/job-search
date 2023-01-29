<template>
  <img :src="imageLink" alt="Profile Image" class="w-8 rounded-3xl" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileImage",
  setup() {
    const imageLink =
      "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png";

    return {
      imageLink,
    };
  },
});
</script>
