<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
const { unit } = storeToRefs(configStore)
</script>

<template>
  <div class="unit-toggler" aria-label="온도 단위 설정">
    <span>온도 단위</span>
    <div class="unit-options" role="group" aria-label="온도 단위 선택">
      <button :class="{ active: unit === 'celsius' }" type="button" @click="configStore.setUnit('celsius')">
        °C 섭씨
      </button>
      <button :class="{ active: unit === 'fahrenheit' }" type="button" @click="configStore.setUnit('fahrenheit')">
        °F 화씨
      </button>
    </div>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  color: #64748b;
  font-size: 13px;
  white-space: nowrap;
}

button {
  padding: 7px 10px;
  font-weight: 700;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  cursor: pointer;
}

button:hover,
button.active { color: white; background: #2563eb; border-color: #2563eb; }

.unit-options { display: flex; gap: 4px; }
</style>
