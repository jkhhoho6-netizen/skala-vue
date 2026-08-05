<script setup>
import { computed, onMounted } from 'vue'
import BaseDashboardCard from '../components/hw1/BaseDashboardCard.vue'
import { useWeatherStore } from '../stores/weatherStore'

const weatherStore = useWeatherStore()

const aqiLabel = computed(() => {
  const labels = ['좋음', '공정', '보통', '나쁨', '매우 나쁨']
  const aqi = weatherStore.airQuality?.main?.aqi
  return aqi ? labels[aqi - 1] : '-'
})

onMounted(() => weatherStore.fetchAirQuality())
</script>

<template>
  <div class="air-quality-page">
    <BaseDashboardCard>
      <template #list>
        <h2>서울 대기질</h2>
        <p class="description">OpenWeather API에서 실시간 대기질 정보를 가져옵니다.</p>

        <p v-if="weatherStore.isAirQualityLoading" class="message">대기질을 불러오는 중입니다...</p>
        <p v-else-if="weatherStore.airQualityError" class="error-message">
          {{ weatherStore.airQualityError }}
        </p>
        <div v-else-if="weatherStore.airQuality" class="quality-result">
          <strong>{{ aqiLabel }}</strong>
          <span>대기질 지수: {{ weatherStore.airQuality.main.aqi }}</span>
          <span>미세먼지 PM2.5: {{ weatherStore.airQuality.components.pm2_5 }} μg/m³</span>
          <span>미세먼지 PM10: {{ weatherStore.airQuality.components.pm10 }} μg/m³</span>
        </div>
      </template>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.air-quality-page { display: flex; justify-content: center; }
h2 { margin-top: 0; color: #172554; }
.description, .message { color: #64748b; }
.quality-result {
  display: grid;
  gap: 12px;
  margin-top: 24px;
  padding: 24px;
  color: #334155;
  background: #eff6ff;
  border-radius: 14px;
}
.quality-result strong { color: #2563eb; font-size: 28px; }
.error-message { color: #c2410c; }
</style>
