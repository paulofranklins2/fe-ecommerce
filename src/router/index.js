import {createRouter, createWebHashHistory} from 'vue-router'
import AddCategory from "@/views/category/AddCategory.vue";
import ListCategory from "@/views/category/ListCategory.vue";
import EditCategory from "@/views/category/EditCategory.vue";
import AddProduct from "@/views/product/AddProduct.vue";
import ListProduct from "@/views/product/ListProduct.vue";
import EditProduct from "@/views/product/EditProduct.vue";

const routes = [
    {
        path: '/',
        name: 'home',
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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
