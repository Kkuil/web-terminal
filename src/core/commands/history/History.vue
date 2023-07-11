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
        <tr class="flex min-w-[100px] max-w-[300px] h-[30px]">
          <td class="w-1/2 h-full flex-center" v-show='order'>序号</td>
          <td class=" h-full flex-center" :class="order ? 'w-1/2' : 'w-full'">命令</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(history, index) in historyStore.list.slice(0, number ?? historyStore.list.length)"
          :key="index"
          class="flex min-w-[100px] max-w-[300px] h-[30px]"
        >
          <td class="order w-1/2 h-full flex-center" v-show="order">{{ index + 1 }}</td>
          <td class="command  h-full flex-center" :class="order ? 'w-1/2' : 'w-full'">{{ history }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss"></style>
