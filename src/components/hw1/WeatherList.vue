<script setup>
import WeatherItem from './WeatherItem.vue'

defineProps({
  weatherList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select-city', 'show-detail'])

const onSelectCity = (cityName) => {
  emit('select-city', cityName)
}

const onShowDetail = (cityName, status) => {
  emit('show-detail', cityName, status)
}
</script>

<template>
  <div class="list-box">
    <h3>🗺 지역별 날씨 현황</h3>

    <WeatherItem
      v-for="city in weatherList"
      :key="city.id"
      :city="city"
      @select-city="onSelectCity"
      @show-detail="onShowDetail"
    />

    <p v-if="weatherList.length === 0" class="empty-message">
      검색 결과가 없습니다.
    </p>
  </div>
</template>

<style scoped>
.list-box {
  background: #f5f7fb;
  border: 1px solid #e3e7ef;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 14px;
}

.list-box h3 {
  margin-top: 0;
  font-size: 16px;
  color: #2f6ea5;
}

.empty-message {
  margin: 10px 0 0;
  color: #888;
  font-size: 14px;
}
</style>
