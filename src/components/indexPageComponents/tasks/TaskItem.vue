<template>
  <q-list :class="bg" :style="{ width: '100%' }" @click.stop>
    <q-item
      v-ripple
      :clickable="isAllToDo"
      class="q-px-md item-custom"
      :class="{ 'shadow-21 q-mb-lg': isAllToDo }"
    >
      <q-item-section class="q-px-md q-ma-md">
        <div class="relative-container">
          <div class="flex items-center no-wrap justify-between">
            <div class="flex">
              <VerticalLine :fillColor="fillColor" />
              <div
                class="text-h6 text-transform-none"
                :class="{ 'text-strike': statusText }"
                no-caps
              >
                {{ labelText }}
              </div>
            </div>
            <slot />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import VerticalLine from "@/assets/SVG/VerticalLine.vue";
import { bg } from "@/constants";

defineOptions({
  name: "TaskItem",
});

defineProps({
  labelText: {
    required: true,
    type: String,
    default: "Сьогоднішні завдання",
  },
  fillColor: {
    type: String,
  },
  statusText: {
    type: Boolean,
    default: false,
  },
  isAllToDo: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.relative-container {
  position: relative;
}

.text-transform-none {
  text-transform: none;
}

.item-custom {
  border-radius: 2rem;
}
</style>
