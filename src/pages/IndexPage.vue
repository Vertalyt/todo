<template>
  <q-page>
    <InputTasks
    @add-todo="addTodo"
    />

    <q-checkbox v-model="todayTask" rounded label="Сьогоднішні завдання" keep-color />

      <TodayTodo
      v-if="todayData.length"
      :todayData="Object.values(todayData)"
      :todayTask="todayTask"
      @update-task="updateTask"
      />

    <OllTodoLists
    v-if="restData.length"
    :tasksAll="restData"
    @update-task="updateTask"
    />

  <div
  v-if="!restData.length"
  class="q-pt-md text-align-center">
    <p>Ще немає завдань</p>
  </div>

  </q-page>
</template>


<script setup>
import { ref, onMounted, watch } from "vue";


import InputTasks from "@/components/indexPageComponents/tasks/InputTasks.vue";
import TodayTodo from '@/components/TodayTodo.vue'
import OllTodoLists from '@/components/OllTodoLists.vue'

import { arrTaskList } from '@/constants'
import { setItemLocal, getItemLocal, separateByTodaysDate, sortByDate, addFillColor } from '@/functions'



defineOptions({
  name: "IndexPage",
});

const todayData = ref([])
const restData = ref([])
const todayTask = ref(true);

watch(todayTask, check => {
  if(!check) {
    restData.value = sortByDate([...todayData.value, ...restData.value])
    todayData.value = []
  } else {
      const { today, rest } = separateByTodaysDate(arrTaskList.value)
      todayData.value = addFillColor(today)
      restData.value = addFillColor(rest)
  }
})

onMounted(() => {
 arrTaskList.value = getItemLocal()
})

watch(arrTaskList, val => {
  if(val.length) {
    const { today, rest } = separateByTodaysDate(val)
    if(today.length) {
      todayData.value = addFillColor(today)
    }
    if(rest.length) {
      restData.value = addFillColor(rest)
    }
  }
}, { deep: true })


const addTodo = ({text, date}) => {
 if (arrTaskList.value.length) {
    // Шукаємо об'єкт з відповідною датою
    const recordingDate = arrTaskList.value.find(dateRec => Object.keys(dateRec)[0] === date);
    if (recordingDate) {
      // Якщо знайдено об'єкт з такою датою, оновлюємо його значення
      recordingDate[date].push({ text:text, check: false });
    } else {
      // Якщо об'єкта з такою датою немає, створюємо новий об'єкт
      arrTaskList.value.push({ [date]: [{ text:text, check: false }] });
    }
  } else {
    // Якщо масив пустий, створюємо новий об'єкт
    arrTaskList.value.push({ [date]: [{ text: text, check: false }] });
  }
   setItemLocal(arrTaskList.value)
}

// Оновлюемо статус завдання
const updateTask = ({check, text, data}) => {
  arrTaskList.value = arrTaskList.value.map(el => {
  const key = Object.keys(el)[0];
  if (key === data) {
    const tasks = el[key]; // Масив завдань
    const updatedTasks = tasks.map(task => {
      if (task.text === text) {
        return {
          ...task,
          check: check
        };
      } else {
        return task;
      }
    });
    return {
      [key]: updatedTasks
    };
  } else {
    return el;
  }
});

// зберегаємо в локал сторадж дані
setItemLocal(arrTaskList.value)
}


</script>

<style scoped>
.text-align-center{
  text-align: center;
}
</style>
