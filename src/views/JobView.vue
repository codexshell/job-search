<template>
  <div>Job Page for job {{ currentJobId }}</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const currentJobId = route.params.id;
</script>
