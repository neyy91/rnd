<template>
  <v-container fill-height fluid>
    <div>
      <v-card width="400px" style="margin: auto;">
        <v-card-text>
          <v-flex class="mb-4">
            <v-avatar size="96" class="mr-4">
              <v-icon aria-hidden="false">
                mdi-account
              </v-icon>
            </v-avatar>
          </v-flex>
          <v-text-field
              v-model="authStore.profile.userInfo.email"
              label="Email" disabled></v-text-field>
          <v-text-field
              v-model="authStore.profile.userInfo.name"
              label="Имя" disabled></v-text-field>
          <v-text-field
              v-model="role"
              label="Роль" disabled></v-text-field>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()

const role = computed(() => authStore.profile.userInfo.roleName === 'student'
? 'Студент': 'Преподаватель')

const form = reactive({
  firstName: 'John',
  lastName: 'Doe',
  contactEmail: 'john@doe.com',
})
const loading = ref(false)

</script>

<style scoped>

</style>