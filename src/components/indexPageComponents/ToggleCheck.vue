
<template>
      <q-toggle
        v-model="modelValue"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      />
</template>

<script setup>
const modelValue = defineModel('toggle', { type: Boolean, default: false});
</script>
