<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

// 주요 도시 좌표 리스트
const cities = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978, top: '24%', left: '32%' },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286, top: '34%', left: '40%' },
  { id: 'city_04', name: '인천', lat: 37.4563, lon: 126.7052, top: '25%', left: '20%' },
  { id: 'city_05', name: '강릉', lat: 37.7522, lon: 128.8759, top: '20%', left: '72%' },
  { id: 'city_06', name: '대전', lat: 36.351, lon: 127.385, top: '48%', left: '42%' },
  { id: 'city_07', name: '대구', lat: 35.8714, lon: 128.6014, top: '58%', left: '70%' },
  { id: 'city_08', name: '광주', lat: 35.1595, lon: 126.8526, top: '70%', left: '30%' },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756, top: '72%', left: '80%' },
  { id: 'city_09', name: '제주', lat: 33.489, lon: 126.4983, top: '92%', left: '28%' },
]

const router = useRouter()
const weatherList = ref([])
const loading = ref(true)

const openCityDetail = (cityId) => {
  router.push({ name: 'weather-detail', params: { cityId } })
}

const fetchMapWeather = async () => {
  if (!apiKey) {
    console.error('VITE_OPENWEATHER_API_KEY 환경 변수가 설정되지 않았습니다.')
    loading.value = false
    return
  }

  try {
    const requests = cities.map((city) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric&lang=kr`,
      ),
    )
    const responses = await Promise.all(requests)

    weatherList.value = responses.map((res, index) => ({
      ...cities[index],
      temp: Math.round(res.data.main.temp),
      icon: res.data.weather[0].icon,
    }))
  } catch (err) {
    console.error('날씨 데이터 가져오기 실패:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMapWeather()
})
</script>

<template>
  <div class="map-container">
    <h3 class="map-title">🗺️ 대한민국 날씨 지도</h3>

    <div v-if="loading" class="loading-text">날씨 불러오는 중...</div>

    <div v-else class="korea-map">
      <!-- 📌 SVG 직접 삽입 -->
      <svg class="map-bg-svg" viewBox="0 0 100 120">
        <path
          d="M 30,10 Q 40,5 50,12 T 75,20 T 70,50 T 80,80 T 60,95 T 35,80 T 25,50 Z"
          fill="#dbeaf9"
          stroke="#93c5fd"
          stroke-width="1.5"
        />
        <!-- 제주도 -->
        <circle cx="30" cy="108" r="4" fill="#dbeaf9" stroke="#93c5fd" stroke-width="1.5" />
      </svg>

      <!-- 도시별 날씨 마커 -->
      <div
        v-for="city in weatherList"
        :key="city.id"
        class="city-marker"
        :style="{ top: city.top, left: city.left }"
        role="button"
        tabindex="0"
        :aria-label="`${city.name} 날씨 상세보기`"
        @click="openCityDetail(city.id)"
        @keydown.enter="openCityDetail(city.id)"
        @keydown.space.prevent="openCityDetail(city.id)"
      >
        <span class="city-name">{{ city.name }}</span>
        <img
          :src="`https://openweathermap.org/img/wn/${city.icon}.png`"
          alt="weather"
          class="city-icon"
        />
        <span class="city-temp">{{ city.temp }}°C</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.loading-text {
  font-size: 14px;
  color: #888;
  padding: 40px 0;
}

.korea-map {
  position: relative;
  width: 100%;
  height: 480px;
  background-color: #eef5fc;
  border-radius: 12px;
  border: 1px solid #d0e1f9;
  overflow: hidden;
}

.city-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.city-marker:hover,
.city-marker:focus-visible {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}

.city-name {
  font-size: 11px;
  font-weight: 700;
  color: #333;
}

.city-icon {
  width: 32px;
  height: 32px;
  margin: -4px 0;
}

.city-temp {
  font-size: 12px;
  font-weight: 700;
  color: #159bd3;
}

.map-bg-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 지도가 마커 클릭을 방해하지 않도록 설정 */
}
</style>
