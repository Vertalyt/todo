<template>
  <div class="q-gutter-sm">
    <q-input
      ref="textRefInput"
      outlined
      standout
      dark
      autofocus
      v-model="textTask"
      label="Додайте завдання"
      @keyup.enter="onEnterInput"
    />
      <q-input
      ref="dateRefInput"
      v-model="dateTask"
      dark
      outlined
      filled
      type="date"
      :min="minDate"
      @keyup.enter="onEnterDateInput"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getTodayDate } from '@/functions'

defineOptions({
  name: "InputTasks",
});

const emit = defineEmits({
  'add-todo': Object
})

const textTask = ref('');
const textRefInput = ref(null);

const dateTask = ref('');
const dateRefInput = ref(null);

const minDate = ref(getTodayDate());


const resetFields = () => {
  textTask.value = ''
  dateTask.value = ''
  textRefInput.value = null
  dateRefInput.value = null
}

const addToDO = () => {
  emit('add-todo', { text: textTask.value, date: dateTask.value })
  resetFields()
}

const focusInput = (inputRef, value) => {
  if (!value) {
    const nativeInputEl = inputRef.value.nativeEl;
    if (nativeInputEl) {
      nativeInputEl.focus();
    }
  } else {
    addToDO()
  }
};

const onEnterInput = () => {
  focusInput(dateRefInput, dateTask.value);
};

const onEnterDateInput = () => {
  dateCorrectly()
  focusInput(textRefInput, textTask.value);
};


function dateCorrectly() {
    if (new Date(dateTask.value) < new Date(minDate.value)) {
      dateTask.value = minDate.value
    }
}


</script>

