<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import BaseDashboardCard from '../components/hw1/BaseDashboardCard.vue'
import SearchBar from '../components/hw1/SearchBar.vue'
import WeatherCard from '../components/hw1/WeatherCard.vue'

const router = useRouter()
const route = useRoute()
const configStore = useConfigStore()
const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
const selectedMessage = ref('카드를 클릭하거나 검색해 보세요.')

const weatherList = [
  { id: 'city_01', name: '서울', searchWords: ['tjdnf', 'seoul'], temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', searchWords: ['tndnjs', 'suwon'], temp: 24, status: '비' },
  { id: 'city_03', name: '부산', searchWords: ['qntks', 'busan'], temp: 26, status: '구름' },
]

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return weatherList.filter(
    (city) =>
      city.name.includes(query) || city.searchWords.some((word) => word.includes(query)),
  )
})

const displayedWeatherList = computed(() =>
  filteredWeatherList.value.map((city) => ({
    ...city,
    temp:
      configStore.unit === 'fahrenheit' ? Math.round((city.temp * 9) / 5 + 32) : city.temp,
    unitSymbol: configStore.unitSymbol,
  })),
)

const selectCard = (city) => {
  selectedMessage.value = `${city.name}이(가) 선택되었습니다.`
}

const openDetail = (city) => {
  router.push(`/weather/${city.id}`)
}

watch(searchQuery, (query) => {
  const normalizedQuery = query.trim()
  const nextQuery = normalizedQuery ? { q: normalizedQuery } : {}

  if (route.query.q !== normalizedQuery) {
    router.replace({ query: nextQuery })
  }
})

watch(
  () => route.query.q,
  (query) => {
    const nextQuery = typeof query === 'string' ? query : ''
    if (nextQuery !== searchQuery.value) searchQuery.value = nextQuery
  },
)
</script>

<template>
  <div class="weather-page">
    <BaseDashboardCard>
      <template #search>
        <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
      </template>

      <template #list>
        <h3 class="weather-list-title">🗺 지역별 날씨 현황</h3>
        <WeatherCard
          v-for="city in displayedWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectCard"
          @click-detail="openDetail"
        />
        <p v-if="displayedWeatherList.length === 0" class="empty-message">
          검색 결과가 없습니다.
        </p>
      </template>

      <template #status>
        <div class="status-box">{{ selectedMessage }}</div>
      </template>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-page {
  display: flex;
  justify-content: center;
}

.status-box {
  padding: 12px;
  color: #2b8a3e;
  text-align: center;
  font-weight: 700;
  background: #e7f7e7;
  border-radius: 6px;
}

.weather-list-title {
  color: #1f2937;
}

.empty-message {
  padding: 14px;
  color: #64748b;
  text-align: center;
}
</style>
