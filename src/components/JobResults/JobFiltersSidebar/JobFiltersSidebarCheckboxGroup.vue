<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-wrap">
        <li
          v-for="value in (uniqueValues as Set<string>)"
          :key="value"
          class="h-8 w-1/2"
        >
          <input
            :id="value"
            v-model="selectedValues"
            type="checkbox"
            :value="value"
            class="mr-3 cursor-pointer"
            :data-test="value"
            @change="selectValue"
          />
          <label :for="value" class="cursor-pointer" data-test="value">{{
            value
          }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { PropType } from "vue";
import { CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/store/constants";

const props = defineProps({
  uniqueValues: {
    type: [Set, Array] as PropType<Set<string> | string[]>,
    required: true,
  },
  mutation: {
    type: String,
    required: true,
  },
});
const store = useStore(key);
const router = useRouter();
const selectedValues = ref<string[]>([]);
store.subscribe((mutation) => {
  if (mutation.type === CLEAR_USER_JOB_FILTER_SELECTIONS) {
    selectedValues.value = [];
  }
});
const selectValue = () => {
  store.commit(props.mutation, selectedValues.value);
  router.push({ name: "JobResults" });
};
</script>
