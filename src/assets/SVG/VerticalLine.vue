
<template>
  <div class="icon-container">
    <svg width="5" height="46" viewBox="0 0 5 46" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="5" height="46" rx="2.5" :fill="fillColor" />
    </svg>
  </div>
</template>


<script setup>
defineProps({
  fillColor: {
    default: '#A9A9A9',
    type: String
  }
})
</script>


<style scoped>
.icon-container {
  position: absolute;
  left: -15px;
  top: 55%;
  transform: translateY(-50%);
}
</style>
