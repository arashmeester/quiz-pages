import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import MathTest from "@/pages/MathTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/math",
      component: MathTest,
    },
  ],
});

export default router;
