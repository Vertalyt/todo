
<template>
      <div
          v-for="tasks in tasksOll"
          :key="bringingKey(tasks)"
          :id="bringingKey(tasks)"
          >

            <tasks
            :labelText="nameTask(tasks)"
            key="'Today Tasks'"
            @click="toggleContainer(bringingKey(tasks))"
            >
            <q-item>

            </q-item>

            <q-btn
            color="grey-7"
            round
            flat
            :icon="getIconStatus(bringingKey(tasks))"
            />
          </tasks>

        <q-slide-transition>
        <div v-if="isShowToDoLists[bringingKey(tasks)]">

          <q-list dense bordered padding class="rounded-borders q-mb-lg shadow-21">
          <q-item
          v-ripple
          v-for="task in Object.values(tasks)[0] "
          :key="task.text"
          >
            <q-item-section>
              <tasks
              :labelText="task.text"
              :key="task.text"
              :fillColor="task.fill"
              :statusText="task.check"
              :isOllToDo="false"
              >
                <ToggleCheck
                  :toggle="task.check"
                  @update:toggle="(newVal) => updateToggle(newVal, task.text, Object.keys(tasks)[0])"
                />
              </tasks>
            </q-item-section>
          </q-item>

        </q-list>
        </div>
       </q-slide-transition>
      </div>

</template>

<script setup>
import { ref } from 'vue'
import Tasks from "@/components/indexPageComponents/tasks/Tasks.vue";
import ToggleCheck from "@/components/indexPageComponents/ToggleCheck.vue";
import { bringingKey } from '@/functions'


const emit = defineEmits({
  "update-task": Object,
});

defineProps({
  tasksOll:{
    required: true,
    type: Array,
  }
})

const isShowToDoLists = ref({})

// міняюю іконку відкрито/закрито список справ
const getIconStatus = (date) => {
  return isShowToDoLists.value[date] !== undefined
  && isShowToDoLists.value[date]
  ? 'arrow_circle_up' : 'expand_circle_down';
};


const toggleContainer = (date) => {
  isShowToDoLists.value[date] = !isShowToDoLists.value[date];
}

function nameTask(task) {
  const date = bringingKey(task);
  const [year, month, day] = date.split('-').map(Number);
  const taskDate = new Date(year, month - 1, day);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (taskDate.toDateString() === today.toDateString()) {
    return 'Сьогоднішні завдання';
  } else if (taskDate.toDateString() === yesterday.toDateString()) {
    return 'Вчорашні завдання';
  } else if (taskDate.toDateString() === tomorrow.toDateString()) {
    return 'Завтрашні завдання';
  } else {
    return `${day}/${month} Завдання`;
  }
}

const updateToggle = (check, text, data) => {
  emit("update-task", { check, text, data });
}

defineOptions({
  name: "OllTodoLists",
});
</script>


<style scoped>
.rounded-borders {
  border-radius: 2rem;
}
</style>
