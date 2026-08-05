<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-content">
    <div class="search-title"><el-icon><Search /></el-icon><h3>도시 검색</h3><span>한글 · 영타 지원</span></div>
    <el-input :model-value="query" placeholder="서울, 부산 또는 영문으로 검색" clearable size="large" @input="emit('update-query', $event)">
      <template #prefix><el-icon><Location /></el-icon></template>
    </el-input>
    <p v-if="query">“{{ query }}” 검색 결과를 확인하고 있습니다.</p>
    <p v-else>도시명을 입력하면 실시간으로 필터링됩니다.</p>
  </div>
</template>

<style scoped>
.search-title { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; color: #2563eb; }
.search-title h3 { margin: 0; color: #1e3a8a; font-size: 14px; font-weight: 800; }
.search-title span { margin-left: auto; color: #94a3b8; font-size: 11px; }

.search-content p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 12px;
}
</style>
