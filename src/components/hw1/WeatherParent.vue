<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

// 모든 반응형 데이터는 부모 컴포넌트에서 관리합니다.
const searchQuery = ref('')
const normalizedQuery = ref('')
const selectedMessage = ref('카드를 클릭하거나 검색해 보세요.')

const weatherList = reactive([
  { id: 'city_01', name: '서울', searchWords: ['tjdnf', 'seoul'], temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', searchWords: ['tndnjs', 'suwon'], temp: 24, status: '비' },
  { id: 'city_03', name: '부산', searchWords: ['qntks', 'busan'], temp: 26, status: '구름' },
])

const selectedCityInfo = reactive({
  name: '',
  temp: 0,
  status: '',
})

// 검색어가 한글 이름 또는 한영키가 바뀐 영문 검색어에 포함되는지 확인합니다.
const filteredWeatherList = computed(() => {
  const query = normalizedQuery.value

  return weatherList.filter(
    (city) => city.name.includes(query) || city.searchWords.some((word) => word.includes(query)),
  )
})

const updateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const selectCard = (city) => {
  Object.assign(selectedCityInfo, {
    name: city.name,
    temp: city.temp,
    status: city.status,
  })
}

const clickDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 검색어가 입력될 때마다 검색에 사용할 형태로 정리합니다.
watch(
  searchQuery,
  (newQuery) => {
    normalizedQuery.value = newQuery.trim().toLowerCase()
  },
  { immediate: true },
)

// 선택된 도시의 내부 값이 바뀌면 상태 문구를 변경합니다.
watch(
  selectedCityInfo,
  (newCity) => {
    if (newCity.name) {
      selectedMessage.value = `${newCity.name}이(가) 선택되었습니다.`
      console.log(`[watch 감지] 상태 바 문구가 변경되었습니다: ${selectedMessage.value}`)
    }
  },
  { deep: true },
)

// 검색어와 선택 도시를 함께 감시하는 예제입니다.
watch([searchQuery, () => selectedCityInfo.name], ([newQuery, newCity]) => {
  console.log(`[multi-source watch] 검색어: '${newQuery}', 선택 도시: '${newCity}'`)
})

// 검색어가 바뀔 때마다 필터 결과를 자동으로 확인합니다.
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터: ${filteredWeatherList.value.length}개`,
  )
})
</script>

<template>
  <div class="weather-page">
    <BaseDashboardCard>
      <template #search>
        <SearchBar :query="searchQuery" @update-query="updateQuery" />
      </template>

      <template #list>
        <h3 class="weather-list-title">🗺 지역별 날씨 현황</h3>

        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectCard"
          @click-detail="clickDetail"
        />

        <p v-if="filteredWeatherList.length === 0" class="empty-message">검색 결과가 없습니다.</p>
      </template>

      <template #status>
        <div class="status-box">
          {{ selectedMessage }}
        </div>
      </template>
    </BaseDashboardCard>
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

.status-box {
  background: #e7f7e7;
  color: #2b8a3e;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
}

.weather-list-title {
  color: #000;
}
</style>
