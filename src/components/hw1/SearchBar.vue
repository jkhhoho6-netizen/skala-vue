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
    <div class="search-input-wrap">
      <el-icon class="search-input-icon"><Location /></el-icon>
      <input
        :value="query"
        type="text"
        placeholder="서울, 부산 또는 영문으로 검색"
        aria-label="도시 검색"
        @input="emit('update-query', $event.target.value)"
      />
      <button
        v-if="query"
        class="clear-button"
        type="button"
        aria-label="검색어 지우기"
        @click="emit('update-query', '')"
      >
        ×
      </button>
    </div>
    <p v-if="query">“{{ query }}” 검색 결과를 확인하고 있습니다.</p>
    <p v-else>도시명을 입력하면 실시간으로 필터링됩니다.</p>
  </div>
</template>

<style scoped>
.search-title { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; color: #2563eb; }
.search-title h3 { margin: 0; color: #1e3a8a; font-size: 14px; font-weight: 800; }
.search-title span { margin-left: auto; color: #94a3b8; font-size: 11px; }

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 40px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  transition: border-color .2s, box-shadow .2s;
}

.search-input-wrap:focus-within {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, .15);
}

.search-input-icon {
  flex: 0 0 auto;
  margin: 0 8px 0 12px;
  color: #94a3b8;
}

.search-input-wrap input {
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 38px 0 0;
  color: #1f2937;
  font: inherit;
  font-size: 14px;
  background: transparent;
  border: 0;
  outline: 0;
}

.search-input-wrap input::placeholder { color: #a8b1bd; }

.clear-button {
  position: absolute;
  right: 10px;
  display: grid;
  width: 20px;
  height: 20px;
  padding: 0;
  place-items: center;
  color: #94a3b8;
  font-size: 18px;
  line-height: 1;
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.clear-button:hover { color: #475569; background: #f1f5f9; }

.search-content p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 12px;
}
</style>
