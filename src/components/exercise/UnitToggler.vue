<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
const { unit, unitSymbol } = storeToRefs(configStore)
</script>

<template>
  <div class="unit-toggler">
    <span>날씨단위: {{ unit === 'celsius' ? '섭씨' : '화씨' }}({{ unitSymbol }})</span>
    <button type="button" @click="configStore.toggleUnit">단위변경</button>
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
  color: white;
  font-weight: 700;
  background: #406486;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

button:hover { background: #31526f; }
</style>
