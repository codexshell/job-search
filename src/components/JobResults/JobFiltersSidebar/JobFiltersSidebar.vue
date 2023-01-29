<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />

      <filters-accordion header="Skills and Qualifications">
        <job-filters-sidebar-skills />
      </filters-accordion>

      <filters-accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </filters-accordion>

      <filters-accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </filters-accordion>

      <filters-accordion header="Job Types">
        <job-filters-sidebar-job-types />
      </filters-accordion>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";

import FiltersAccordion from "@/components/shared/FiltersAccordion.vue";

import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/jobFiltersSidebarDegrees.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

export default defineComponent({
  name: "JobFiltersSideBar",
  components: {
    FiltersAccordion,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarJobTypes,
    JobFiltersSidebarOrganizations,
    JobFiltersSidebarPrompt,
    JobFiltersSidebarSkills,
  },
  setup() {
    const parseSkillsSearchTerm = () => {
      const route = useRoute();
      const role = route.query.role || "";
      const store = useStore(key);
      store.commit(UPDATE_SKILLS_SEARCH_TERM, role);
    };
    onMounted(parseSkillsSearchTerm);

    return {
      parseSkillsSearchTerm,
    };
  },
});
</script>
