import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login.vue"),
        },
        {
            path: "/",
            name: "home",
            component: () => import("../views/home.vue"),
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.name === "login") {
        return next();
    }
    const storedHash = localStorage.getItem("loadingJobHash");
    if (!storedHash) {
        return next("/login"); 
    }
    next();
});



export default router;