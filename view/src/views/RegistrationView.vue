<template>
  <div class="auth-form">
    <v-sheet max-width="300" class="mx-auto">
      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
            v-model="email"
            label="Email"
        />
        <v-text-field
            v-model="userName"
            label="Имя"
        />
        <v-text-field
            v-model="password"
            type="password"
            label="Пароль"
        />
        <v-select
            v-model="role"
            label="Роль"
            :items="[{name: 'Студент', id: 1}, {name: 'Преподаватель', id: 2}]"
            item-title="name"
            item-value="id"
        ></v-select>

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
const email = ref('')
const role = ref(1)

const submit = async () => {
  await authStore.register({
    email: email.value,
    password: password.value,
    role: role.value,
    name: userName.value
  })
  await router.push('/dashboard')

}

</script>

<style scoped>
.auth-form {
  margin-top: 10%;
}
</style>