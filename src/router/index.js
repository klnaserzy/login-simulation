import { createWebHashHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LogView from '../views/LogView.vue';
import LogIn from '../components/LogIn.vue';
import SignUp from '../components/SignUp.vue';
import ModifyInformation from '../views/ModifyInformation.vue';

const router = createRouter({
    // 需要後端配合才能使用createWebHistory
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        { 
            path: '/', 
            component: HomeView ,
            name: 'home'
        },
        {
            path: '/log',
            component: LogView,
            name: 'log',
            children: [
                {
                    path: 'login',
                    component: LogIn,
                    name: 'login'
                },
                {
                    path: 'signup',
                    component: SignUp,
                    name: 'signup'
                }
            ]
        },
        {
            path: '/modify-information',
            component: ModifyInformation,
            name: 'modify-information'
        }
    ]
});

export default router;
