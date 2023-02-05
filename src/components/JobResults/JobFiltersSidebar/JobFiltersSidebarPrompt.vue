<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear Filters"
        type="secondary"
        data-test="clear-job-filters"
        @click="clearUserJobFilterSelections"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { key } from "@/store";
import { CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/store/constants";
import ActionButton from "@/components/shared/ActionButton.vue";

const store = useStore(key);
const clearUserJobFilterSelections = () => {
  store.commit(CLEAR_USER_JOB_FILTER_SELECTIONS);
};
</script>
