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
  emit('click-detail', city.name, city.status)
}
</script>

<template>
  <div class="weather-item" @click="handleCardClick">
    <div>
      <p>{{ city.name }} ({{ city.status }})</p>
      <p>현재 기온: {{ city.temp }}℃</p>

      <span v-if="city.temp >= 25" class="hot-label">🔥 더움</span>
      <span v-else class="cool-label">❄ 선선함</span>
    </div>

    <button @click.stop="handleDetailClick">상세보기</button>
  </div>
</template>

<style scoped>
.weather-item {
  border: 1px solid #d9dfe8;
  border-radius: 6px;
  background: white;
  padding: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.weather-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.weather-item p {
  margin: 4px 0;
  color: #1f2937;
  font-weight: 500;
}

.hot-label,
.cool-label {
  display: inline-block;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.hot-label {
  background: #ff6b6b;
}

.cool-label {
  background: #74c0fc;
}

.weather-item button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>
