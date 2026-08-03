<template>
  <div class="dashboard-card">
    <h2>🌤 과제 3: 날씨 (컴포넌트)</h2>

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
  width: 460px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
}

.dashboard-card h2 {
  margin-top: 0;
  color: #1f4c7a;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.search-box,
.list-box {
  background: #f5f7fb;
  border: 1px solid #e3e7ef;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 14px;
}
</style>
