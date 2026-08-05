<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
import WeatherMap from './components/hw1/Weathermap.vue'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-mark"><el-icon><Sunny /></el-icon></div>
      <div>
        <p class="eyebrow">WEATHER INSIGHT</p>
        <h1>오늘의 날씨를 한눈에</h1>
      </div>
      <el-tag class="live-tag" type="success" effect="light" round>LIVE MONITORING</el-tag>
    </header>

    <nav class="navigation-bar" aria-label="주요 메뉴">
      <div class="nav-links">
        <RouterLink to="/weather"><el-icon><Cloudy /></el-icon> 대시보드</RouterLink>
        <RouterLink to="/about"><el-icon><InfoFilled /></el-icon> 서비스 소개</RouterLink>
        <RouterLink to="/air-quality"><el-icon><Odometer /></el-icon> 미세먼지</RouterLink>
      </div>
      <UnitToggler />
    </nav>

    <main class="main-content">
      <div class="router-section">
        <RouterView />
      </div>

      <aside class="map-section">
        <WeatherMap />
      </aside>
    </main>
  </div>
</template>

<style>
.app-shell {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 4px 24px;
}

.brand-mark {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  color: #fff;
  font-size: 25px;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border-radius: 15px;
  box-shadow: 0 10px 24px rgba(37, 99, 235, .2);
}
.eyebrow { margin: 0; color: #3b82f6; font-size: 11px; font-weight: 800; letter-spacing: .15em; }
.app-header h1 { margin: 2px 0 0; color: #172554; font-size: 22px; font-weight: 800; }
.live-tag { margin-left: auto; font-size: 11px; font-weight: 700;
}

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, .85);
  border: 1px solid #e5edf8;
  border-radius: 14px;
  box-shadow: 0 5px 18px rgba(30, 64, 175, .06);
}
.nav-links {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  gap: 4px;
  flex-wrap: wrap;
}
.navigation-bar a {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 12px;
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  border-radius: 9px;
}
.navigation-bar a.router-link-exact-active { color: #2563eb; background: #eff6ff; }
.navigation-bar a:hover { color: #2563eb; background: #f8fafc; }

/* 📌 2컬럼 레이아웃 추가 설정 */
.main-content {
  min-height: 480px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 왼쪽 기존 라우터 영역 */
.router-section {
  flex: 1;
  min-width: 0;
}

/* 오른쪽 날씨 지도 영역 */
.map-section {
  width: 410px;
  padding: 22px;
  background: #fff;
  border: 1px solid #e5edf8;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(30, 64, 175, .08);
}

/* 반응형: 화면이 좁아지면 아래로 배치 */
@media (max-width: 900px) {
  .main-content {
    flex-direction: column;
  }

  .map-section {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .navigation-bar {
    flex-wrap: wrap;
  }

  .nav-links {
    width: 100%;
    flex-basis: 100%;
  }

  .unit-toggler {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
}
</style>
