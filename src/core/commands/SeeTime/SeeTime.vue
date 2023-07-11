<script setup lang="ts">
import moment from 'moment'
</script>

<template>
  <div class="cur-time text-white flex">
    <div class='py-[2px] px-[5px] rounded-[5px] bg-[#0094ff]'>今天是：{{ moment().format('YYYY-MM-DD') }}</div>
    <div class='py-[2px] px-[5px] rounded-[5px] bg-[#548af7] ml-[5px]'>现在是：{{ moment().format('HH:mm:ss') }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
