import { defineStore } from 'pinia'

/**
 * 历史记录
 */
export const useHistoryStore = defineStore('history', {
  state: () => ({
    list: [] as string[]
  }),
  actions: {
    // 增加历史
    addHistory(command: string) {
      this.list.push(command)
    },
    // 清空历史
    clearHistory() {
      this.list = []
    }
  }
})