<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="uniqueOrganizations"
    :mutation="ADD_SELECTED_ORGANIZATIONS"
    data-test="degrees-filter"
  />
</template>

<script setup lang="ts">
import { useUniqueOrganizations } from "@/store/composables";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

import JobFiltersSidebarCheckboxGroup from "./JobFiltersSidebarCheckboxGroup.vue";

const uniqueOrganizations = useUniqueOrganizations();
</script>
