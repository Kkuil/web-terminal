<script setup lang="ts">
import { defineProps } from 'vue'
import ContentOutput from './ContentOutput.vue'

defineProps({
  list: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div v-for="result in list" :key="result.id">
    [local]$ <span>{{ result.command }}</span>
    <ContentOutput :output="result.output" />
  </div>
</template>

<style scoped lang="scss"></style>
