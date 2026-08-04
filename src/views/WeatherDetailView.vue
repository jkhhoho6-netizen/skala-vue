<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { useWeatherStore } from '../stores/weatherStore'

const props = defineProps({
  cityId: { type: String, required: true },
})

const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

onMounted(() => {
  if (!weatherStore.lastUpdated) weatherStore.fetchWeather()
})

const city = computed(() => weatherStore.cities.find((item) => item.id === props.cityId))
const displayTemp = computed(() => {
  if (!city.value) return 0
  return configStore.unit === 'fahrenheit'
    ? Math.round((city.value.temp * 9) / 5 + 32)
    : city.value.temp
})
</script>

<template>
  <section v-if="weatherStore.isLoading" class="detail-card">
    <h2>실시간 날씨를 불러오는 중입니다...</h2>
  </section>

  <section v-else-if="weatherStore.error" class="detail-card not-found-detail">
    <h2>날씨 정보를 불러오지 못했습니다.</h2>
    <p>{{ weatherStore.error }}</p>
  </section>

  <section v-else-if="city" class="detail-card">
    <h2>📊 지역별 상세 기상 관측 정보</h2>
    <div class="weather-summary">
      <p>📍 지정 지역: 대한민국 {{ city.name }}</p>
      <p>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>기상 현황: {{ city.status }}</p>
      <p>대기 습도: {{ city.humidity }}%</p>
      <p>현재 풍속: {{ city.wind }}m/s</p>
    </div>
    <button type="button" @click="router.push('/weather')">← 메인 대시보드로 돌아가기</button>
  </section>

  <section v-else class="detail-card not-found-detail">
    <h2>❓ 도시 정보를 찾을 수 없습니다.</h2>
    <p>요청한 도시 ID({{ cityId }})에 해당하는 데이터가 없습니다.</p>
    <button type="button" @click="router.push('/weather')">날씨 메인으로 이동</button>
  </section>
</template>

<style scoped>
.detail-card {
  padding: 22px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);
}

.detail-card h2 {
  padding-bottom: 12px;
  color: #334155;
  font-size: 18px;
  border-bottom: 1px solid #e2e8f0;
}

.weather-summary {
  margin: 16px 0;
  padding: 16px;
  color: #475569;
  background: #f1f5f9;
  border-radius: 6px;
}

.weather-summary p { margin: 4px 0; }

button {
  padding: 9px 14px;
  color: white;
  background: #2563eb;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}
</style>
