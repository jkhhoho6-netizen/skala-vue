import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const AIR_POLLUTION_API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution'

const cities = [
  { id: 'city_01', name: '서울', searchWords: ['tjdnf', 'seoul'], lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', searchWords: ['tndnjs', 'suwon'], lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', searchWords: ['qntks', 'busan'], lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '인천', searchWords: ['dlscks', 'incheon'], lat: 37.4563, lon: 126.7052 },
  { id: 'city_05', name: '강릉', searchWords: ['rkdfmd', 'gangneung'], lat: 37.7522, lon: 128.8759 },
  { id: 'city_06', name: '대전', searchWords: ['eowjs', 'daejeon'], lat: 36.351, lon: 127.385 },
  { id: 'city_07', name: '대구', searchWords: ['eorn', 'daegu'], lat: 35.8714, lon: 128.6014 },
  { id: 'city_08', name: '광주', searchWords: ['rhkdwn', 'gwangju'], lat: 35.1595, lon: 126.8526 },
  { id: 'city_09', name: '제주', searchWords: ['wpwn', 'jeju'], lat: 33.489, lon: 126.4983 },
]

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const normalizeWeather = (city, data) => ({
  ...city,
  temp: Math.round(data.main.temp),
  status: data.weather[0]?.description || '정보 없음',
  icon: data.weather[0]?.icon || '',
  humidity: data.main.humidity,
  wind: data.wind.speed,
  updatedAt: data.dt * 1000,
})

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cities: cities.map((city) => ({ ...city })),
    airQuality: null,
    isAirQualityLoading: false,
    airQualityError: '',
    isLoading: false,
    error: '',
    lastUpdated: null,
  }),
  actions: {
    async fetchWeather() {
      if (!apiKey) {
        this.error = 'VITE_OPENWEATHER_API_KEY 환경 변수가 설정되지 않았습니다.'
        return
      }

      this.isLoading = true
      this.error = ''

      try {
        const responses = await Promise.all(
          cities.map((city) =>
            axios.get(API_URL, {
              params: { lat: city.lat, lon: city.lon, appid: apiKey, units: 'metric', lang: 'kr' },
            }),
          ),
        )
        this.cities = responses.map((response, index) => normalizeWeather(cities[index], response.data))
        this.lastUpdated = Date.now()
      } catch (requestError) {
        this.error = requestError.response?.data?.message || '날씨 정보를 불러오지 못했습니다.'
      } finally {
        this.isLoading = false
      }
    },
    async fetchAirQuality(lat = 37.5665, lon = 126.978) {
      if (!apiKey) {
        this.airQualityError = 'VITE_OPENWEATHER_API_KEY 환경 변수가 설정되지 않았습니다.'
        return
      }

      this.isAirQualityLoading = true
      this.airQualityError = ''

      try {
        const response = await axios.get(AIR_POLLUTION_API_URL, {
          params: { lat, lon, appid: apiKey },
        })
        this.airQuality = response.data.list?.[0] || null
      } catch (requestError) {
        this.airQualityError =
          requestError.response?.data?.message || '대기질 정보를 불러오지 못했습니다.'
      } finally {
        this.isAirQualityLoading = false
      }
    },
  },
})
