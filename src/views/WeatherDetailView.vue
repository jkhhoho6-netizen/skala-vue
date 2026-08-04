<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({
  cityId: { type: String, required: true },
})

const router = useRouter()
const configStore = useConfigStore()
const mockWeather = {
  city_01: { name: '서울특별시', temp: 28, status: '맑음', humidity: 55, wind: 2.5 },
  city_02: { name: '수원시', temp: 24, status: '비', humidity: 72, wind: 1.8 },
  city_03: { name: '부산광역시', temp: 26, status: '구름', humidity: 68, wind: 3.1 },
}

const city = computed(() => mockWeather[props.cityId])
const displayTemp = computed(() => {
  if (!city.value) return 0
  return configStore.unit === 'fahrenheit'
    ? Math.round((city.value.temp * 9) / 5 + 32)
    : city.value.temp
})
</script>

<template>
  <section v-if="city" class="detail-card">
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
