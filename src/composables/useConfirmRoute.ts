import { useRoute } from "vue-router";
import { computed } from "vue";

const useConfirmRoute = (routeName: string) => {
  const route = useRoute();
  return computed(() => routeName === route.name);
};

export default useConfirmRoute;
