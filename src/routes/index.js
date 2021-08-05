import { lazy } from "react";

const routes = [
    {
        name: "demo1",
        path: "/demo1",
        component: lazy(() => import("../pages/demo1"))
    },
    {
        name: "demo2",
        path: "/demo2",
        component: lazy(() => import("../pages/demo2"))
    },
    {
        name: "demo3",
        path: "/demo3",
        component: lazy(() => import("../pages/demo3"))
    },
    {
        name: "demo4",
        path: "/demo4",
        component: lazy(() => import("../pages/demo4"))
    },
    {
        name: "demo5",
        path: "/demo5",
        component: lazy(() => import("../pages/demo5"))
    },
    {
        name: "demo6",
        path: "/demo6",
        component: lazy(() => import("../pages/demo6"))
    },
    {
        name: "demo7",
        path: "/demo7",
        component: lazy(() => import("../pages/demo7"))
    },
    {
        name: "demo8",
        path: "/demo8",
        component: lazy(() => import("../pages/demo8"))
    },
    {
        name: "demo9",
        path: "/demo9",
        component: lazy(() => import("../pages/demo9"))
    },
    {
        name: "demo10",
        path: "/demo10",
        component: lazy(() => import("../pages/demo10"))
    },
    {
        name: "demo11",
        path: "/demo11",
        component: lazy(() => import("../pages/demo11"))
    },
    {
        name: "demo12",
        path: "/demo12",
        component: lazy(() => import("../pages/demo12"))
    },
];

export default routes