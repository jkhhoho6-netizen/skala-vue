<script setup>
const { city } = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const handleCardClick = () => {
  emit('select-card', city)
}

const handleDetailClick = () => {
  emit('click-detail', city)
}
</script>

<template>
  <div class="weather-item" @click="handleCardClick">
    <div>
      <div class="city-heading"><p>{{ city.name }}</p><el-tag size="small" effect="light" round>{{ city.status }}</el-tag></div>
      <p class="temperature">{{ city.temp }}<small>{{ city.unitSymbol || '°C' }}</small></p>
      <span v-if="city.temp >= 25" class="hot-label">더운 날씨</span>
      <span v-else class="cool-label">선선한 날씨</span>
    </div>
    <el-button type="primary" plain round @click.stop="handleDetailClick">상세보기 <el-icon><ArrowRight /></el-icon></el-button>
  </div>
</template>

<style scoped>
.weather-item {
  border: 1px solid #e5edf8;
  border-radius: 13px;
  background: white;
  padding: 15px 16px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: .2s ease;
}

.weather-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.city-heading { display: flex; align-items: center; gap: 8px; }
.weather-item p { margin: 0; color: #172554; font-weight: 800; }
.temperature { margin-top: 4px !important; font-size: 25px; letter-spacing: -.04em; }
.temperature small { margin-left: 2px; color: #64748b; font-size: 13px; font-weight: 700; }

.hot-label,
.cool-label {
  display: inline-block;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 700;
}

.hot-label {
  background: #ff6b6b;
}

.cool-label {
  background: #60a5fa;
}
</style>
