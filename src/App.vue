<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Form from './components/Form.vue';
import { RouterView } from "vue-router";
import { useAuthStore } from './store';

const authStore = useAuthStore();
const adminUser = authStore.adminUser;
</script>

<template>
  <div class="">
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
