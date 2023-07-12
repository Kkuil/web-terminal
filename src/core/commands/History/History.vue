<script setup lang="ts">
import { defineProps } from 'vue'
import { useHistoryStore } from '@/stores/history'

interface Props {
  number?: number
  order?: number
}

const historyStore = useHistoryStore()
defineProps<Props>()
</script>

<template>
  <div class="history">
    <table>
      <thead>
        <tr class="h-[30px]">
          <td class="w-[100px] h-full" v-show="order">序号</td>
          <td class="h-full">命令</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(history, index) in historyStore.list.slice(0, number ?? historyStore.list.length)"
          :key="index"
        >
          <td class="order h-full" v-show="order">{{ index + 1 }}</td>
          <td class="command h-full">{{ history }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss"></style>
