
<template>

  <q-page>

    <div v-if="arrTaskList.length" lass="q-pa-md" style="max-width: 350px, ">
    <q-list bordered>
      <q-item v-ripple>
        <q-item-section>Виконані завдання</q-item-section>
        <q-item-section avatar>
          {{ completedTasks }}
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-ripple>
        <q-item-section>Не виконані завдання</q-item-section>
        <q-item-section avatar>
          {{ notCompletedTasks }}
        </q-item-section>
      </q-item>

    </q-list>
  </div>

  <div v-else
  class="q-pt-md text-align-center">
    <p>Ще немає завдань</p>
  </div>

  </q-page>
</template>


<script setup>
import { onMounted, watch, ref } from 'vue'
import { arrTaskList } from '@/constants'
import { getItemLocal } from '@/functions'


onMounted( () => {
  if(!arrTaskList.value.length ) {
    arrTaskList.value = getItemLocal()
  }
})


const completedTasks = ref(0)
const notCompletedTasks = ref(0)

// слідкуємо за зміною виконаних завдань
watch(arrTaskList, val => {
  if(val.length) {
    val.forEach(day => {
  Object.values(day).forEach(taskList => {
    taskList.forEach(task => {
      if (task.check) {
        completedTasks.value++;
      } else {
        notCompletedTasks.value++;
      }
    });
  });
});
  }
}, { deep: true, immediate: true })



</script>

<script>
export default {
  name: 'SettingPage',
}
</script>

