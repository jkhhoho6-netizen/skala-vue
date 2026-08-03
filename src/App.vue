<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'
import WeatherSearch from './components/hw1/WeatherSearch.vue'
import WeatherList from './components/hw1/WeatherList.vue'
import WeatherStatus from './components/hw1/WeatherStatus.vue'

// ref(): 검색어와 안내 문구처럼 하나의 값을 저장합니다.
const searchQuery = ref('')
const normalizedQuery = ref('')
const selectedMessage = ref('카드를 클릭하거나 검색해 보세요.')

// reactive(): 지역별 날씨 목록을 배열로 관리합니다.
const weatherList = reactive([
  { id: 'city_01', name: '서울', searchWords: ['tjdnf'], temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', searchWords: ['tndnjs'], temp: 24, status: '비' },
  { id: 'city_03', name: '부산', searchWords: ['qntks'], temp: 26, status: '구름' },
])

// 선택된 도시의 여러 정보를 하나의 반응형 객체로 관리합니다.
const selectedCityInfo = reactive({
  name: '',
  temp: 0,
  status: '',
})

// computed(): 검색어가 도시 이름에 포함된 날씨만 골라냅니다.
const filteredWeatherList = computed(() => {
  const query = normalizedQuery.value

  return weatherList.filter(
    (city) => city.name.includes(query) || city.searchWords.some((word) => word.includes(query)),
  )
})

const selectCity = (city) => {
  Object.assign(selectedCityInfo, city)
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// watch(): 입력 중인 검색어를 매번 확인하고 검색하기 좋은 형태로 바꿉니다.
watch(
  searchQuery,
  (newQuery) => {
    normalizedQuery.value = newQuery.trim().toLowerCase()
  },
  { immediate: true },
)

// watch(): 선택된 도시 정보가 바뀔 때마다 상태 문구를 바꾸고 콘솔에 기록합니다.
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

// multi-source watch: 검색어와 선택 도시를 함께 감시합니다.
watch([searchQuery, () => selectedCityInfo.name], ([newQuery, newCity]) => {
  console.log(`[multi-source watch] 검색어: '${newQuery}', 선택 도시: '${newCity}'`)
})

// watchEffect(): 내부에서 사용한 searchQuery를 자동으로 감시합니다.
watchEffect(() => {
  console.log(
    `[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터: ${filteredWeatherList.value.length}개`,
  )
})
</script>

<template>
  <div class="weather-page">
    <div class="weather-card">
      <h2>🌤 과제 2: 날씨 (컴포지션)</h2>

      <WeatherSearch v-model="searchQuery" />

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
