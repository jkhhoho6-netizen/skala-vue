<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

const onInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-content">
    <h3>🔍 도시 검색 (한글 및 영타 즉시 동기화)</h3>

    <input type="text" placeholder="검색할 도시 이름 입력" :value="query" @input="onInput" />

    <p>검색 중인 도시: {{ query }}</p>
  </div>
</template>

<style scoped>
.search-content h3 {
  margin-top: 0;
  font-size: 16px;
  color: #2f6ea5;
}

.search-content input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 8px;
}

.search-content p {
  color: #1f2937;
  font-weight: 500;
}
</style>
