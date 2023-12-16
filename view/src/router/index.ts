import {createRouter, createWebHistory} from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import MyProgramsView from '../views/MyProgramsView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProgramCardView from '../views/ProgramCardView.vue'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: LandingView,
        },
        {
            path: '/login',
            name: 'login',
            component: AuthView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegistrationView,
        },
        {
            path: '/dashboard',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: '',
                    component: ProgramsView
                },
                {
                    path: 'self',
                    component: MyProgramsView
                },
                {
                    path: 'card/:id',
                    component: ProgramCardView
                },
                {
                    path: 'profile',
                    component: ProfileView
                },

            ]
        }
    ]
})

export default router
