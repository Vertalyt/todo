
<template>
      <q-toggle
        v-model="toggleFlag"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      />
</template>


<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:toggle'])
const props = defineProps({
  toggle: {
    required: false,
    type: Boolean,
    default: false,
  }
})


const toggleFlag = ref(props.toggle);

watch(toggleFlag, newValue => {
  emit('update:toggle', newValue)
})

</script>


