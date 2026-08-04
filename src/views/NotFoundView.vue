<template>
  <section class="not-found-card">
    <div class="not-found-icon">☀️❓</div>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.</p>
    <RouterLink to="/weather">날씨 메인으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.not-found-card {
  padding: 80px 20px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);
}

.not-found-icon { margin-bottom: 18px; font-size: 48px; }
h2 { color: #334155; }
p { color: #94a3b8; }
a {
  display: inline-block;
  margin-top: 18px;
  padding: 10px 18px;
  color: white;
  background: #1689ed;
  border-radius: 20px;
}
</style>
