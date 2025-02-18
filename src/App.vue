<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/authStore';

const auth = useAuthStore();
auth.checkLoginStatus();
</script>

<template>
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
    main {
        width: 100%;
    }

    footer {
        background-color: hsl(0, 10, 20%);   
    }
</style>
