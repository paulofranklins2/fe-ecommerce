import {createRouter, createWebHashHistory} from 'vue-router'
import AddCategory from "@/views/category/AddCategory.vue";
import ListCategory from "@/views/category/ListCategory.vue";
import EditCategory from "@/views/category/EditCategory.vue";
import AddProduct from "@/views/product/AddProduct.vue";
import ListProduct from "@/views/product/ListProduct.vue";
import EditProduct from "@/views/product/EditProduct.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import OAuthCallback from "@/views/auth/OAuthCallback.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/admin/category/add',
        name: 'AddCategory',
        component: AddCategory
    }
    ,
    {
        path: '/admin/category/',
        name: 'ListCategory',
        component: ListCategory
    }
    ,
    {
        path: '/admin/category/:id',
        name: 'EditCategory',
        component: EditCategory
    }
    ,
    {
        path: '/admin/product/add',
        name: 'AddProduct',
        component: AddProduct
    }
    ,
    {
        path: '/admin/product/',
        name: 'ListProduct',
        component: ListProduct
    }
    ,
    {
        path: '/admin/product/:id',
        name: 'EditProduct',
        component: EditProduct
    }
    ,
    {
        path: '/auth/register',
        name: 'RegisterView',
        component: RegisterView
    }
    ,
    {
        path: '/auth/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: "/oauth/callback",
        name: "OAuthCallback",
        component: OAuthCallback,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
