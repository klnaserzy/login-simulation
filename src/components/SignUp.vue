<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const form = ref({
  name: '',
  email: '',
  account: '',
  password: ''
})
const checkPassword = ref('')

const accountExisted = computed(() => auth.accountExisted);

const handleRegister = () => {
  if(form.value.password !== checkPassword.value){
    alert('密碼不相同')
    return;
  }

  auth.register(form.value)
  if(auth.createAccountSuccess) {
    router.push({name: 'login'})
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleRegister">
      <p>註冊</p>
      <div id="nameInput">
        <label for="name">姓名：</label>
        <input v-model="form.name" id="name" type="text" required>
      </div>
      <div id="emailInput">
        <label for="email">郵箱：</label>
        <input v-model="form.email" id="email" type="email" required>
      </div>
      <div id="accountInput">
        <label for="account">帳號：</label>
        <input v-model="form.account" id="account" type="text" required>
      </div>
      <div id="passwordInput">
        <label for="password">密碼：</label>
        <input v-model="form.password" id="password" type="password" required>
      </div>
      <div id="checkPasswordInput">
        <label for="checkPasswordInput">確認密碼：</label>
        <input v-model="checkPassword" id="checkPassword" type="password">
      </div>
      <button>註冊</button>
    </form>
    <p v-if="accountExisted">這個帳號已經有人使用了</p>
    <RouterLink :to="{name: 'login'}">已經有帳號了嗎?</RouterLink>
    <p>註冊的帳號僅保留在Pinia</p>
  </div>
</template>

<style scoped>
</style>