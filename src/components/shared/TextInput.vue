<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
