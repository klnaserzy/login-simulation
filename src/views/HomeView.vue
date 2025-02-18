<script setup>
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '../stores/authStore';
  import { computed } from 'vue';

  const auth = useAuthStore();
  const isLoggedIn = computed(() => auth.isLoggedIn);
</script>

<template>
  <div id="main">
    <div v-if="isLoggedIn">
      <button @click="auth.logout">登出</button>
      <RouterLink :to="{name: 'modify-information'}">修改資料</RouterLink>
    </div>
    <div v-else>
      <RouterLink :to="{name: 'login'}">登入</RouterLink>
      <RouterLink to="/log/signup">註冊</RouterLink>
    </div>
    <p>登入狀態：{{ isLoggedIn }}</p>
  </div>
</template>

<style scoped>
  a {
    margin: 20px;
  }
</style>
