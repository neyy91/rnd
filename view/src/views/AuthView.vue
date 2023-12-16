<template>
  <div class="auth-form">
    <v-sheet max-width="300" class="mx-auto">
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
            v-model="userName"
            label="Email"
        />
        <v-text-field
            v-model="password"
            type="password"
            label="Пароль"
        />
        <v-btn
            type="submit"
            block
            class="mt-2"
            text="Submit"
        ></v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import apiClient from "@/plugins/axios";
import {useAuthStore} from "@/stores/auth";
import router from "@/router";

const authStore = useAuthStore()

const userName = ref('')
const password = ref('')
const role = ref(1)

const submit = async () => {
  await authStore.auth({
    username: userName.value,
    password: password.value
  })
  await router.push('/dashboard')
}

</script>

<style scoped>
.auth-form {
  margin-top: 10%;
}
</style>