import { createRouter, createWebHistory } from 'vue-router';
import Form from '../components/Form.vue';
import List from '../components/List.vue';
import ListDetail from '../components/ListDetail.vue';
import Admin from '../components/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/list/:id',
    name: 'ListDetail',
    component: ListDetail,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
