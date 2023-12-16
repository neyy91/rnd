import { defineStore } from 'pinia'
import apiClient from "@/plugins/axios";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const profile = reactive<any>({
        userInfo: null
    })

    const router = useRouter()

    const register = async (data: any) => {
        const res = await apiClient.post('/auth/registration', data)
        localStorage.setItem('access_token', res.data.access_token)
    }

    const auth = async (data: any) => {
        const res = await apiClient.post('/auth/login', data)
        localStorage.setItem('access_token', res.data.access_token)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        router.push('/login')
    }

    const getProfile = async () => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        profile.userInfo = res.data
    }


    return { profile, auth, logout, register, getProfile }
})
