<template>
  <h2 style="max-width: 900px; margin: auto; text-align: center">{{currentProgram
      .name}}</h2>
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

      <v-card-text style="width: 500px;">
        <v-form v-if="currentType === 1">
          <v-text-field
              v-model="name"
              label="Имя"
          />
        </v-form>
        <v-form v-if="currentType === 2">
          <v-text-field
              v-model="native"
              label="Фраза"
          />
          <v-text-field
              v-model="study"
              label="Перевод"
          />
          <v-text-field
              v-model="description"
              label="Описание"
          />
        </v-form>
        <v-form v-if="currentType === 3">

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="action">Добавить</v-btn>
        <v-btn color="error" @click="() => showModal = false">Отменить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
 <div class="card">
   <div class="list">
     <h3>Словари</h3>
     <v-btn v-if="isTeacher" color="primary" @click="() => openModal(1)">Добавить</v-btn>
     <div v-for="card in dictionary" @click="() => getCardList(card.id)"
          class="list-item" :class="{active: currentCard === card.id}">
       {{card.name}}
     </div>
   </div>
   <div class="list">
     <h3>Карточки</h3>
     <v-btn v-if="isTeacher" color="primary" @click="() => openModal(2)">Добавить</v-btn>
     <div v-for="cardItem in cards" @click="() => setCurrentWord(cardItem.id)"
          class="list-item"
          :class="{active: cardItem.id ===  currentWord?.id, learn: cardItem.isLearn}">
       {{cardItem.study}}
     </div>
   </div>
   <div class="card-item"
        v-if="currentWord">
     <div>
       <div class="card-item_desc">
         {{currentWord.native}}
       </div>
       <div class="card-item_desc">
         {{currentWord.study}}
       </div>
       <div class="card-item_desc">
         {{currentWord.description}}
       </div>
     </div>
    <div class="actions">
      <template v-if="isTeacher">
        <v-btn>Редактировать</v-btn>
        <v-btn>Удалить</v-btn>
      </template>
      <template v-else>
        <v-btn>Прослушать</v-btn>
        <v-btn @click="learn">Выучить</v-btn>
      </template>
    </div>
   </div>
 </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useProgram} from "@/stores/program";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";
const programStore = useProgram()
const authStore = useAuthStore()

const dictionary = computed<any>(() => programStore.dictionary)
const cards = computed<any>(() => programStore.cards)
const route = useRoute()
const currentProgram = ref<any>({})
const showModal = ref(false)
const currentType = ref<any>(null)
const native = ref('')
const study = ref('')
const description = ref('')
const name = ref('')
const currentCard = ref<any>(null)
const currentWord = ref<any>(null)
const currentDictionary = ref<any>(null)

const isTeacher = computed(() =>
    authStore.profile.userInfo?.roleName === 'teacher')

const action = async () => {
  if (currentType.value === 1) {
    await programStore.addDictionary(currentProgram.value.id, {
      name: name.value
    })
    await programStore.getDictionary(currentProgram.value.id)
    name.value = ''
  }

  if (currentType.value === 2) {
    await programStore.addCard(currentDictionary.value.id, {
      native: native.value,
      study:  study.value,
      description: description.value,
    })
    programStore.getCard(currentCard.value)
  }

  if (currentType.value === 3) {
  }

    showModal.value = false
}

const learn = () => {
  programStore.learnCard(route.params.id, {
    cardId: currentWord.value.id
  })
  programStore.getCard(currentCard.value)
}

const getCardList = (id: any) => {
  currentCard.value = id
  currentDictionary.value = dictionary.value.find((x:any) => x.id === id)
  programStore.getCard(id)
}

const setCurrentWord = (id: any) => {
  currentWord.value = cards.value.find((e: any) => e.id === id)
}

const openModal = async (type: any) => {
  currentType.value = type
  showModal.value = true
}


onMounted(async () => {
  currentProgram.value = await programStore.getMyProgramById(route.params.id)
  await programStore.getDictionary(route.params.id)
})


</script>

<style scoped>
.card {
  margin: auto;
  display: flex;
  max-width: 900px;
}

.card > div {
  padding: 25px;
}

.list {
  margin-bottom: 25px;
}

.list-item {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.list-item:hover {
  background: #e6e6e6;
}

.card-item {
  display: flex;
}

.actions {
  margin-left: 10px;
  display: flex;
  gap: 20px;
  flex-flow: column;
}

.card-item_desc {
  width: 200px;
  height: 75px;
  text-align: center;
  background: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background: #e6e6e6;
}

.learn {
  background: #00c853;
}

</style>