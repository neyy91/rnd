<template>
  <v-toolbar v-if="isTeacher">
    <v-btn @click="() => openModal('1')">Добавить язык</v-btn>
    <v-btn @click="() => openModal('2')">Добавить пару</v-btn>
    <v-btn @click="() => openModal('3')">Добавить программу</v-btn>
  </v-toolbar>
  <v-dialog :model-value="showModal" persistent>
    <v-card
        class="mx-auto my-8"
        max-width="900"
        elevation="16"
    >
      <v-card-item>
        <v-card-title>
          Добавить
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form v-if="currentType === '1'">
          <v-text-field
              v-model="name"
              label="Язык"
          />
          <v-text-field
              v-model="iso2"
              label="Код"
          />
        </v-form>
        <v-form v-if="currentType === '2'">
          <v-select
              v-model="nativeId"
              label="Базовый"
              :items="languages"
              item-title="name"
              item-value="id"
          ></v-select>
          <v-select
              v-model="studyId"
              label="Для изучения"
              :items="languages"
              item-title="name"
              item-value="id"
          ></v-select>
        </v-form>
        <v-form v-if="currentType === '3'">
          <v-select
              v-model="pairId"
              label="Пара"
              :items="pair"
              item-title="name"
              item-value="id"
          ></v-select>
          <v-text-field
              v-model="name"
              label="Название программы"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="action">Добавить</v-btn>
        <v-btn color="error" @click="rollback">Отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        @click="() => toCard(item.id)"
        style="cursor:pointer;"
    >
    <td class="text-center">{{item.pairName}}</td>
      <td class="text-center">{{item.ownerName}}</td>
      <td class="text-center">{{item.name}}</td>
      <td v-if="isTeacher" class="text-center"><v-btn>Удалить</v-btn></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {useProgram} from "@/stores/program";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
const programStore = useProgram()
const authStore = useAuthStore()
const router = useRouter()

const items = computed<any>(() => programStore.programList)

const currentType = ref('')
const showModal = ref(false)

const languages = computed(() => programStore.languages)
const pair = computed(() =>
  programStore.pair.map((e:any) => {
    const native = languages.value.find((a:any) => a.id === e.nativeId)
    const study = languages.value.find((a:any) => a.id === e.studyId)
    return {
      name: `${native?.name}-${study?.name}`,
      id: e.id
    }
  })
)


const name = ref<any>('')
const iso2 = ref<any>('')

const nativeId = ref<any>('')
const studyId = ref<any>('')
const pairId = ref<any>('')

const isTeacher = computed(() => authStore.profile.userInfo?.roleName ===
    'teacher')

const action = async () => {
  if (currentType.value === '1') {
    await programStore.addLanguage({
      name: name.value,
      iso2: iso2.value
    })
    name.value = ''
    iso2.value = ''
    showModal.value = false
  }
  if (currentType.value === '2') {
    await programStore.addPair({
      nativeId: nativeId.value,
      studyId: studyId.value
    })
    nativeId.value = ''
    studyId.value = ''
    showModal.value = false
  }
  if (currentType.value === '3') {
    await programStore.addProgram({
      name: name.value,
      pairId: pairId.value
    })
    name.value = ''
    pairId.value = ''
    showModal.value = false
  }

  getProgram()
}

onMounted(() => {
  getProgram()
})

const toCard = (id: any) => {
  router.push(`/dashboard/card/${id}`)
}

const openModal = async (type: any) => {
  currentType.value = type
  await programStore.getLanguage()
  await programStore.getPair()
  showModal.value = true
}

const rollback = () => {
  name.value = ''
  iso2.value = ''
  nativeId.value = ''
  studyId.value = ''
  pairId.value = ''
  showModal.value = false
}

const getProgram = () => {
  if (authStore.profile.userInfo === null) {
    return
  }
  if (authStore.profile.userInfo.roleName === 'teacher') {
    programStore.getMyProgram()
  } else {
    programStore.getSubscribers()
  }
}

watch(authStore.profile, () => {
  getProgram()
})

</script>

<style lang="scss" scoped>

</style>