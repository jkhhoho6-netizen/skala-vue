<script setup>
const { city } = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select-city', 'show-detail'])

const handleCardClick = () => {
  emit('select-city', city)
}

const handleDetailClick = () => {
  emit('show-detail', city.name, city.status)
}
</script>

<template>
  <div class="city-item" @click="handleCardClick">
    <div>
      <p>{{ city.name }} ({{ city.status }})</p>
      <p>현재 기온: {{ city.temp }}℃</p>

      <span v-if="city.temp >= 25" class="hot-label">
        🔥 더움 (25도 이상)
      </span>
      <span v-else class="cool-label">
        ❄ 선선함 (25도 미만)
      </span>
    </div>

    <button @click.stop="handleDetailClick">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.city-item {
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

.city-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.city-item p {
  margin: 4px 0;
  color: #1f2937;
  font-weight: 500;
}

.hot-label {
  display: inline-block;
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.cool-label {
  display: inline-block;
  background: #74c0fc;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.city-item button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>
