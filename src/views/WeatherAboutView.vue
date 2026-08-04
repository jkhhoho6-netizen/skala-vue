<template>
  <section class="about-card">
    <h2>ℹ️ 서비스 소개</h2>
    <p>본 앱은 Vue 3와 Vue Router 4를 활용한 실습용 기상 관측 대시보드입니다.</p>
    <ul>
      <li>컴포넌트 기반 날씨 카드 구성</li>
      <li>클라이언트 사이드 라우팅을 통한 화면 전환</li>
      <li>도시 ID를 활용한 동적 상세 페이지</li>
    </ul>
    <RouterLink class="home-button" to="/weather">대시보드 홈으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.about-card {
  padding: 22px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);
}

h2 { color: #334155; font-size: 18px; }
p, li { color: #64748b; }
ul { padding-left: 20px; }
.home-button {
  display: block;
  padding: 10px;
  color: white;
  text-align: center;
  background: #159bd3;
  border-radius: 4px;
}
</style>
