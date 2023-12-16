import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import apiClient from "@/plugins/axios";
import {useAuthStore} from "@/stores/auth";


export const useProgram = defineStore('program', () => {

    const programList = ref<any>([])
    const languages = ref<any>([])
    const pair = ref<any>([])
    const dictionary = ref<any>([])
    const cards = ref<any>([])

    const authStore = useAuthStore()

    const isTeacher = computed(() => authStore.profile.userInfo?.roleName ===
        'teacher')

    const getProgram = async () => {
        programList.value = []
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/program', {
            headers: {Authorization: `Bearer ${token}`}
        })
        programList.value = res.data
    }

    const addProgram = async (data: any) => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.post('/program', data, {
            headers: {Authorization: `Bearer ${token}`}
        })
        programList.value = res.data
    }
    const getMyProgram = async () => {
        programList.value = []
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/program/self', {
            headers: {Authorization: `Bearer ${token}`}
        })
        programList.value = res.data
    }

    const getSubscribers = async () => {
        programList.value = []
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/subscriber', {
            headers: {Authorization: `Bearer ${token}`}
        })
        programList.value = res.data
    }

    const subscribe = async (data: any) => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.post('/subscriber', data, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    const getLanguage = async () => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/language', {
            headers: {Authorization: `Bearer ${token}`}
        })
        languages.value = res.data
    }

    const addLanguage = async (data: any) => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.post('/language', data, {
            headers: {Authorization: `Bearer ${token}`}
        })
        programList.value = res.data
    }

    const addPair = async (data: any) => {
        const token = localStorage.getItem('access_token')
        await apiClient.post('/pair', data, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    const getPair = async () => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get('/pair', {
            headers: {Authorization: `Bearer ${token}`}
        })
        pair.value = res.data
    }

    const getDictionary = async (id: any) => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get(`/dictionary/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        dictionary.value = res.data
    }

    const addDictionary = async (id: any, data: any) => {
        const token = localStorage.getItem('access_token')
        await apiClient.post(`/dictionary/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    const getCard = async (id: any) => {
        const token = localStorage.getItem('access_token')
        const res = await apiClient.get(`/card/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })

        cards.value = res.data

    }

    const addCard = async (id: any, data: any) => {
        const token = localStorage.getItem('access_token')
        await apiClient.post(`/card/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    const learnCard = async (id: any, data:any) => {
        const token = localStorage.getItem('access_token')
        await apiClient.patch(`/card/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    const getMyProgramById = async (id:any) => {
        if (isTeacher.value) {
            await getMyProgram()
        } else {
            await getSubscribers()
        }

        return programList.value.find((e :any)=> String(e.id) === String(id))
    }

    return {
        getProgram,
        getMyProgram,
        addLanguage,
        getPair,
        getLanguage,
        getSubscribers,
        addProgram,
        getDictionary,
        addDictionary,
        learnCard,
        getMyProgramById,
        addPair,
        addCard,
        getCard,
        subscribe,
        programList,
        languages,
        dictionary,
        cards,
        pair
    }
})
