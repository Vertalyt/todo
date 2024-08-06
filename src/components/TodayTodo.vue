<template>

  <!-- Список завдань поточного дня -->
  <q-slide-transition>
    <!-- Флаг чи розгорнуто -->
    <div v-if="todayTask">

      <q-list dense bordered padding  class="rounded-borders q-mb-lg shadow-21">

        <q-item
        rounded>
          <q-item-section          >
            <div
              v-for="(task, idx) in computedTasks[0][Object.keys(computedTasks[0])[0]]"
              :key="idx"
            >
              <tasks
                :labelText="task.text"
                :key="task.text"
                :fillColor="task.fill"
                :statusText="task.check"
                :isOllToDo="false"
              >
                <ToggleCheck
                  :toggle="task.check"
                  @update:toggle="(newVal) => updateToggle(
                        newVal,
                        task.text,
                        Object.keys(computedTasks[0])[0]
                      )
                  "
                />
              </tasks>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-slide-transition>

</template>

<script setup>
import { computed } from "vue";

import Tasks from "@/components/indexPageComponents/tasks/Tasks.vue";
import ToggleCheck from "@/components/indexPageComponents/ToggleCheck.vue";

const emit = defineEmits({
  "update-task": Object,
});

const props = defineProps({
  todayData: {
    required: true,
    type: Array,
  },
  todayTask: {
    required: true,
    type: Boolean,
  }
});

const computedTasks = computed( () => props.todayData )

const updateToggle = (check, text, data) => {
  emit("update-task", { check, text, data });
}

defineOptions({
  name: "TodayTodo",
});
</script>


<style scoped>
.rounded-borders {
  border-radius: 2rem;
}
</style>
