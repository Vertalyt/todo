<template>
  <div v-for="tasks in tasksAll" :key="`${bringingKey(tasks)} + ${Date.now()}`">
    <TaskItem
      :labelText="nameTask(tasks)"
      key="'Today Tasks'"
      @click="handleClick(tasks)"
    >
      <q-btn
        color="grey-7"
        round
        flat
        :icon="getIconStatus(tasks)"
      />
    </TaskItem>

    <q-slide-transition>
      <div v-if="visibleTodoMap[bringingKey(tasks)]">
        <q-list
          dense
          bordered
          padding
          class="rounded-borders q-mb-lg shadow-21"
        >
          <q-item
            v-ripple
            v-for="task in Object.values(tasks)[0]"
            :key="task.text"
          >
            <q-item-section>
              <TaskItem
                :labelText="task.text"
                :key="task.text"
                :fillColor="task.fill"
                :statusText="task.check"
                :isAllToDo="false"
              >
                <ToggleCheck
                  :toggle="task.check"
                  @update:toggle="
                    (newVal) =>
                      updateToggle(newVal, task.text, Object.keys(tasks)[0])
                  "
                />
              </TaskItem>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-slide-transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskItem from "@/components/indexPageComponents/tasks/TaskItem.vue";
import ToggleCheck from "@/components/indexPageComponents/ToggleCheck.vue";
import { bringingKey } from "@/functions";

const emit = defineEmits({
  "update-task": Object,
});

defineProps({
  tasksAll: {
    required: true,
    type: Array,
  },
});

defineOptions({
  name: "OllTodoLists",
});

const visibleTodoMap = ref({});

// міняюю іконку відкрито/закрито список справ
const getIconStatus = (tasks) => {
  const dateTask = bringingKey(tasks)
  const isDateDefined = visibleTodoMap.value[dateTask] !== undefined;
  const isTaskVisible = visibleTodoMap.value[dateTask];

  return isDateDefined && isTaskVisible
    ? "arrow_circle_up"
    : "expand_circle_down";
};

const toggleContainer = (date) => {
  visibleTodoMap.value[date] = !visibleTodoMap.value[date];
};

const handleClick = (tasks) => {
  const date = bringingKey(tasks);
  toggleContainer(date);
};

function nameTask(task) {
  const date = bringingKey(task);
  const [year, month, day] = date.split("-");
  const taskDate = new Date(year, month - 1, day);

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (taskDate.toDateString() === today.toDateString()) {
    return "Сьогоднішні завдання";
  } else if (taskDate.toDateString() === yesterday.toDateString()) {
    return "Вчорашні завдання";
  } else if (taskDate.toDateString() === tomorrow.toDateString()) {
    return "Завтрашні завдання";
  } else {
    return `${day}/${month} Завдання`;
  }
}

const updateToggle = (check, text, data) => {
  emit("update-task", { check, text, data });
};


</script>

<style scoped>
.rounded-borders {
  border-radius: 2rem;
}
</style>
