<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="accordion-header"
      @click="setIsOpen"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="w-full mt-5">
      <slot> Empty Slot !!! </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, computed } from "vue";

export default defineComponent({
  name: "FiltersAccordion",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const setIsOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const caretIcon = computed(() =>
      isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
    );

    return { isOpen, setIsOpen, caretIcon };
  },
});
</script>
