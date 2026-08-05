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
    <el-skeleton :rows="5" animated />
  </section>

  <section v-else-if="weatherStore.error" class="detail-card not-found-detail">
    <el-result icon="error" title="날씨 정보를 불러오지 못했습니다." :sub-title="weatherStore.error" />
  </section>

  <section v-else-if="city" class="detail-card">
    <div class="detail-heading"><div><p class="eyebrow">CITY WEATHER DETAIL</p><h2>{{ city.name }} 상세 관측</h2></div><el-tag type="success" effect="light" round>현재 관측</el-tag></div>
    <div class="hero-temp"><span>{{ displayTemp }}</span><small>{{ configStore.unitSymbol }}</small><strong>{{ city.status }}</strong></div>
    <div class="weather-summary">
      <div><el-icon><Cloudy /></el-icon><span>습도<strong>{{ city.humidity }}%</strong></span></div>
      <div><el-icon><WindPower /></el-icon><span>풍속<strong>{{ city.wind }}m/s</strong></span></div>
      <div><el-icon><Location /></el-icon><span>지역<strong>대한민국 {{ city.name }}</strong></span></div>
    </div>
    <el-button type="primary" @click="router.push('/weather')"><el-icon><ArrowLeft /></el-icon> 대시보드로 돌아가기</el-button>
  </section>

  <section v-else class="detail-card not-found-detail">
    <el-result icon="warning" title="도시 정보를 찾을 수 없습니다." :sub-title="`요청한 도시 ID(${cityId})에 해당하는 데이터가 없습니다.`">
      <template #extra><el-button type="primary" @click="router.push('/weather')">날씨 메인으로 이동</el-button></template>
    </el-result>
  </section>
</template>

<style scoped>
.detail-card {
  padding: 22px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(30, 64, 175, .08);
}
.detail-heading { display: flex; align-items: center; justify-content: space-between; }
.detail-heading h2 { margin: 4px 0 0; color: #172554; font-size: 22px; font-weight: 800; }
.eyebrow { margin: 0; color: #3b82f6; font-size: 10px; font-weight: 800; letter-spacing: .14em; }
.hero-temp { display: flex; align-items: baseline; gap: 3px; margin: 28px 0; color: #172554; }
.hero-temp span { font-size: 64px; font-weight: 800; line-height: 1; letter-spacing: -.06em; }
.hero-temp small { color: #64748b; font-size: 18px; font-weight: 700; }
.hero-temp strong { margin-left: 12px; color: #2563eb; font-size: 15px; }

.weather-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 16px 0 22px;
}
.weather-summary > div { display: flex; flex-direction: column; gap: 5px; padding: 14px; color: #64748b; background: #f8fbff; border: 1px solid #e5edf8; border-radius: 12px; font-size: 12px; }
.weather-summary .el-icon { color: #3b82f6; font-size: 18px; }
.weather-summary strong { display: block; margin-top: 2px; color: #172554; font-size: 14px; }
@media (max-width: 560px) { .weather-summary { grid-template-columns: 1fr; } }
</style>
