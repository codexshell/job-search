import { computed } from "vue";

type SimpleRef = {
  value: number;
};

const usePreviousAndNextPages = (
  currentPage: SimpleRef,
  lastPage: SimpleRef
) => {
  const previousPage = computed(() => {
    const previousPage = currentPage.value - 1;
    const firstPage = 1;
    return previousPage < firstPage ? null : previousPage;
  });
  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage > lastPage.value ? null : nextPage;
  });

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
