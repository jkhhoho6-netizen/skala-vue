<script setup>
import { ref } from 'vue'
import SampleChild from './SampleChild.vue'

const message = ref('Parent 초기 메시지')

const handleUpdateRequest = (newValue) => {
  message.value = newValue
}
</script>

<template>
  <div class="practice-section">
    <h2>Props & Emits</h2>
    <div class="parent-container">
      <h2>상위 컴포넌트 (parent)</h2>
      <p>
        현재 로컬 데이터(State): <strong>{{ message }}</strong>
      </p>
      <br />
      <SampleChild :parent-data="message" @update-request="handleUpdateRequest" />
    </div>
  </div>
</template>
