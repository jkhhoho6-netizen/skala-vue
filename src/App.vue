<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>🌤 종합실습 5: 스토어적용</h1>
    </header>

    <nav class="navigation-bar" aria-label="주요 메뉴">
      <RouterLink to="/">🌤 날씨 대시보드</RouterLink>
      <span class="nav-divider" aria-hidden="true">|</span>
      <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
      <UnitToggler />
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-shell {
  width: min(100%, 760px);
  margin: 0 auto;
}

.app-header {
  padding: 0 0 14px;
  border-bottom: 1px solid #dfe4eb;
}

.app-header h1 {
  color: #1f2937;
  font-size: 22px;
  font-weight: 700;
}

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 20px 0;
  padding: 14px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);
}

.navigation-bar a {
  padding: 0;
  color: #9aa3ad;
  font-size: 14px;
  font-weight: 600;
}

.navigation-bar a.router-link-exact-active {
  color: #159bd3;
  border-bottom: 2px solid #159bd3;
}

.navigation-bar a:hover {
  background: transparent;
  color: #159bd3;
}

.nav-divider {
  color: #e2e6eb;
}

.main-content {
  min-height: 480px;
}

@media (max-width: 600px) {
  .navigation-bar {
    flex-wrap: wrap;
  }

  .unit-toggler {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }
}
</style>
