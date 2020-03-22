import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage.vue"
import ToDoList from "../components/ToDoList";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage
    },
    {
        path: "/ToDoList",
        name: "ToDoList",
        component: ToDoList
    }];

const router = new VueRouter({
    routes
});

export default router;