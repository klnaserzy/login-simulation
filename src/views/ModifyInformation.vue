<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { ref } from 'vue';

const auth = useAuthStore();
const newName = ref('')
const checkNewNameFlag = ref(false);
const router = useRouter();

const modifyInfo = () => {
    if(newName.value === '') {
        checkNewNameFlag.value = true;
        return ;
    }

    auth.modifyInformation({
        name: newName.value
    })
    newName.value = '';
}
</script>

<template>
    <div>
        <RouterLink :to="{name: 'home'}">首頁</RouterLink>
        <p>{{ auth.user || '' }}</p>
        <p>名稱: {{ auth.user.name || '' }}</p>
        <p>新名稱: <input type="text" v-model="newName"></p>
        <p class="warn" v-if="checkNewNameFlag">請輸入新名稱</p>
        <button @click="modifyInfo">確認更改</button>
        <button @click="router.push({name: 'home'})">返回主頁</button>
    </div>
</template>

<style scoped>
.warn {
    color: red;
}
</style>