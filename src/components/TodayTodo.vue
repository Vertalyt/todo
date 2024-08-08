<template>
  <q-slide-transition>
    <div v-if="todayTask">
      <q-list dense bordered padding class="rounded-borders q-mb-lg shadow-21">
        <q-item
          v-for="(task, idx) in tasksForGivenDate(computedTasks)"
          :key="idx"
          rounded
        >
          <q-item-section>
            <TaskItem
              :labelText="task.text"
              :tasks="task.text"
              :key="task.text"
              :fillColor="task.fill"
              :statusText="task.check"
              :isAllToDo="false"
            >
              <ToggleCheck
                :toggle="task.check"
                @update:toggle="
                  (newVal) =>
                    updateToggle(
                      newVal,
                      task.text,
                      Object.keys(computedTasks[0])[0]
                    )
                "
              />
            </TaskItem>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-slide-transition>
</template>

<script setup>
import { computed } from "vue";

import TaskItem from "@/components/indexPageComponents/tasks/TaskItem.vue";
import ToggleCheck from "@/components/indexPageComponents/ToggleCheck.vue";


defineOptions({
  name: "TodayTodo",
});

const props = defineProps({
  todayData: {
    required: true,
    type: Array,
  },
  todayTask: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits({
  "update-task": Object,
});

const computedTasks = computed(() => props.todayData);

const updateToggle = (check, text, data) => {
  emit("update-task", { check, text, data });
};

const tasksForGivenDate = (computedTasks) => {
  return computedTasks[0][Object.keys(computedTasks[0])[0]];
}

</script>

<style scoped>
.rounded-borders {
  border-radius: 2rem;
}
</style>
