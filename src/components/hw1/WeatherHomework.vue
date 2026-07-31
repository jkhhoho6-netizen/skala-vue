<script setup>
import { ref, computed } from 'vue'
import WeatherSearch from './WeatherSearch.vue'
import WeatherList from './WeatherList.vue'
import WeatherStatus from './WeatherStatus.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' }
])

const keyword = ref('')
const selectedMessage = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(keyword.value))
})

const selectCity = (cityName) => {
  selectedMessage.value = `${cityName}이(가) 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="weather-page">
    <div class="weather-card">
      <h2>🌤 과제 1: 날씨 (Mockup)</h2>

      <WeatherSearch v-model="keyword" />

      <WeatherList
        :weather-list="filteredWeatherList"
        @select-city="selectCity"
        @show-detail="showDetail"
      />

      <WeatherStatus :message="selectedMessage" />
    </div>
  </div>
</template>

<style scoped>
.weather-page {
  min-height: 100vh;
  background-color: #dfeaf7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
}

.weather-card {
  width: 460px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

.weather-card h2 {
  margin-top: 0;
  color: #1f4c7a;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}
</style>
