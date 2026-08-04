<script setup>
import { useCounterStore } from '@/stores/counter'

// 스토어 인스턴스 가져오기
const counterStore = useCounterStore()
</script>

<template>
  <div class="counter-practice">
    <h2>Pinia Counter 실습</h2>
    <p>현재 count: {{ counterStore.count }}</p>
    <p>doubleCount: {{ counterStore.doubleCount }}</p>

    <button @click="counterStore.increment">증가 (+1)</button>
  </div>
</template>

<style scoped>
.counter-practice {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
