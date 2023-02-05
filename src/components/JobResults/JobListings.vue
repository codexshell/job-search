<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{
              name: 'JobResults',
              query: {
                page: previousPage,
              },
            }"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { onBeforeMount } from "vue";
import { computed } from "@vue/reactivity";
import {
  useFilteredJobs,
  useFetchJobsDispatch,
  useFetchDegreesDispatch,
} from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePreviousAndNextPage from "@/composables/usePreviousAndNextPage";

import JobListing from "@/components/JobResults/JobListing.vue";

export default defineComponent({
  name: "JobListings",
  components: {
    JobListing,
  },
  setup() {
    onBeforeMount(() => {
      useFetchJobsDispatch();
      useFetchDegreesDispatch();
    });
    const filteredJobs = useFilteredJobs();
    const currentPage = useCurrentPage();
    const lastPage = computed(() => Math.ceil(filteredJobs.value.length / 10));
    const { previousPage, nextPage } = usePreviousAndNextPage(
      currentPage,
      lastPage
    );
    const displayedJobs = computed(() => {
      const pageNumber = currentPage.value;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
    });

    return {
      previousPage,
      nextPage,
      currentPage,
      displayedJobs,
    };
  },
});
</script>
