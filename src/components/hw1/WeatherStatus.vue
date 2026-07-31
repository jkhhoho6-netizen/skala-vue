<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="status-box">
    {{ message }}
  </div>
</template>

<style scoped>
.status-box {
  background: #e7f7e7;
  color: #2b8a3e;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
}
</style>
