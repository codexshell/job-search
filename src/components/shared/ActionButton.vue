<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "primary",
    validator: (value: string) => {
      return ["primary", "secondary"].includes(value);
    },
  },
});

const type = toRef(props, "type");

const buttonClass = computed(() => type.value);
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}

.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
