<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const account = ref('')
const password = ref('')
const loginStatus = ref(true);

const handleLogin = () => {
  auth.login({
    account: account.value,
    password: password.value
  })
  loginStatus.value = auth.isLoggedIn;
  
  if(auth.isLoggedIn === true){
    router.push('/')
  }
}

</script>

<template>
  <div>
    <p>登入</p>
    <p v-if="auth.createAccountSuccess">成功註冊</p>
    <form @submit.prevent="handleLogin">
      <div id="accountInput">
        <label for="account">帳號：</label>
        <input v-model="account" id="account" type="text">
        <span> yellow</span>
      </div>
      <div id="passwordInput">
        <label for="password">密碼：</label>
        <input v-model="password" id="password" type="password">
        <span> abc</span>
      </div>
      <button>登入</button>
    </form>
  </div>
  <p v-if="!loginStatus">登入失敗</p>
  <RouterLink :to="{name: 'signup'}">還沒有帳號嗎?</RouterLink>
  <p>或者可以使用f12中出現的其他模擬帳號</p>
</template>

<style scoped>
</style>