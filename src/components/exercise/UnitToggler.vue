<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
const { unit } = storeToRefs(configStore)
</script>

<template>
  <div class="unit-toggler" aria-label="온도 단위 설정">
    <span>온도 단위</span>
    <el-radio-group :model-value="unit" size="small" @change="configStore.setUnit">
      <el-radio-button value="celsius">°C</el-radio-button>
      <el-radio-button value="fahrenheit">°F</el-radio-button>
    </el-radio-group>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  color: #64748b;
  font-size: 12px;
  white-space: nowrap;
}

</style>
