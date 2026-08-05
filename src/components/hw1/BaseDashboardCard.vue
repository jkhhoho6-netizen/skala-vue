<template>
  <div class="dashboard-card">
    <div class="card-heading">
      <div>
        <p class="section-label">REGIONAL FORECAST</p>
        <h2>지역별 날씨 현황</h2>
      </div>
      <el-icon class="heading-icon"><DataLine /></el-icon>
    </div>

    <div class="search-box">
      <slot name="search"></slot>
    </div>

    <div class="list-box">
      <slot name="list"></slot>
    </div>

    <slot name="status"></slot>
  </div>
</template>

<style scoped>
.dashboard-card {
  width: 100%;
  background: white;
  border: 1px solid #e5edf8;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 12px 28px rgba(30, 64, 175, .08);
  box-sizing: border-box;
}

.card-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.section-label { margin: 0; color: #3b82f6; font-size: 10px; font-weight: 800; letter-spacing: .14em; }
.dashboard-card h2 { margin: 3px 0 0; color: #172554; font-size: 20px; font-weight: 800; }
.heading-icon { color: #60a5fa; font-size: 27px; }

.search-box,
.list-box {
  background: #f8fbff;
  border: 1px solid #e5edf8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
