<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="search-box">
    <h3>🔍 도시 검색</h3>

    <input
      type="text"
      placeholder="검색할 도시 이름 입력"
      :value="modelValue"
      @input="onInput"
    />

    <p>검색 중인 도시: {{ modelValue }}</p>
  </div>
</template>

<style scoped>
.search-box {
  background: #f5f7fb;
  border: 1px solid #e3e7ef;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 14px;
}

.search-box h3 {
  margin-top: 0;
  font-size: 16px;
  color: #2f6ea5;
}

.search-box input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
}

.search-box p {
  color: #1f2937;
  font-weight: 500;
}
</style>
