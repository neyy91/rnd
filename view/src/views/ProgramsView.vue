<template>
  <v-table style="max-width: 900px; margin: auto">
    <thead>
    <tr>
      <th class="text-center">
        Пара
      </th>
      <th class="text-center">
        Преподаватель
      </th>
      <th class="text-center">
        Программа
      </th>
      <th />
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in items"
        :key="item.name"
    >
      <td class="text-center">{{item.pairName}}</td>
      <td class="text-center">{{item.ownerName}}</td>
      <td class="text-center">{{item.name}}</td>
      <td v-if="!isTeacher" class="text-center"
          @click="() => subscribe(item.id)"><v-btn>Подписаться</v-btn></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useProgram} from "@/stores/program";
import {useAuthStore} from "@/stores/auth";
const programStore = useProgram()
const authStore = useAuthStore()

const isTeacher = computed(() => authStore.profile.userInfo?.roleName ===
    'teacher')

const items = computed(() => programStore.programList)

const subscribe = (id:any) => {
  programStore.subscribe({
    programId: id
  })
}

programStore.getProgram()

</script>

<style lang="scss" scoped>

</style>