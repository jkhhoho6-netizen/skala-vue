<template>
  <section class="about-card">
    <p class="eyebrow">ABOUT WEATHER INSIGHT</p>
    <h2>더 쉽게 읽는 오늘의 날씨</h2>
    <p>Vue 3와 Element Plus로 구성한 실습용 기상 관측 대시보드입니다.</p>
    <div class="feature-grid">
      <div><el-icon><Grid /></el-icon><strong>지역별 카드</strong><span>도시별 현재 상태를 빠르게 비교합니다.</span></div>
      <div><el-icon><Search /></el-icon><strong>빠른 검색</strong><span>한글과 영문 검색어를 함께 지원합니다.</span></div>
      <div><el-icon><DataLine /></el-icon><strong>상세 관측</strong><span>기온, 습도, 풍속을 한 화면에 담았습니다.</span></div>
    </div>
    <el-button type="primary" size="large" @click="$router.push('/weather')">대시보드 홈으로 이동 <el-icon><ArrowRight /></el-icon></el-button>
  </section>
</template>

<style scoped>
.about-card {
  padding: 30px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(30, 64, 175, .08);
}
.eyebrow { margin: 0; color: #3b82f6; font-size: 10px; font-weight: 800; letter-spacing: .14em; }
h2 { margin: 5px 0 10px; color: #172554; font-size: 26px; font-weight: 800; }
.about-card > p:not(.eyebrow) { color: #64748b; }
.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 28px 0; }
.feature-grid div { display: flex; flex-direction: column; gap: 6px; padding: 16px; background: #f8fbff; border: 1px solid #e5edf8; border-radius: 12px; }
.feature-grid .el-icon { color: #3b82f6; font-size: 21px; }
.feature-grid strong { color: #172554; font-size: 14px; }
.feature-grid span { color: #64748b; font-size: 12px; line-height: 1.5; }
@media (max-width: 560px) { .feature-grid { grid-template-columns: 1fr; } }
</style>
