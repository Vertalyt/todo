<template>
  <q-list
  :class="bg"
  :style="{ width: '100%' }"
  @click.stop
  >
    <q-item
    v-ripple
    :clickable="isOllToDo"
    class="q-px-md item-custom"
    :class="{ 'shadow-21 q-mb-lg' : isOllToDo }"
    >
    <q-item-section
    class="q-px-md q-ma-md"
    >
      <div class="relative-container">
        <div
        class="flex align-items-center no-wrap justify-between">
          <div class="flex">
            <VerticalLine :fillColor="fillColor"/>
            <div class="text-h6 text-transform-none"
            :class="{ 'text-strike' : statusText }"
            no-caps>
              {{ labelText }}
            </div>
          </div>
          <slot />
        </div>
      </div>


    </q-item-section>
    </q-item >
  </q-list >
</template>

<script setup>
import VerticalLine from "@/assets/SVG/VerticalLine.vue";
import { bg } from '@/constants'

defineOptions({
  name: "TaskList",
});

defineEmits(['inClick'])

defineProps({
  labelText: {
    required: true,
    type: String,
    default: "Сьогоднішні завдання",
  },
  fillColor: {
    required: false,
    type: String
  },
  statusText: {
    required: false,
    type: Boolean,
    default: false
  },
  isOllToDo: {
    required: false,
    type: Boolean,
    default: true
  }
});
</script>


<style>
.justify-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

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
