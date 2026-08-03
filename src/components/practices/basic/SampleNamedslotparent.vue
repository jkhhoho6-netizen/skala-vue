<script setup>
import SlotNamedChild from './SampleNamedslotchild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Named Slot 레이아웃 주입 실습</h2>
    <SlotNamedChild>
      <template v-slot:header>
        <h3>Child 주입 제목</h3>
      </template>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
      </p>
    </SlotNamedChild>
  </div>
</template>
