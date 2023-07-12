import { defineStore } from 'pinia'

export const useTerminalStore = defineStore('terminal', {
  state: () => ({
    config: {
      isShowWelcome: true,
      history: [] as string[]
    }
  }),
  actions: {
    hideWelcome() {
      this.config.isShowWelcome = false
    },
    // 增加历史
    addHistory(command: string) {
      this.config.history.push(command)
    },
    // 清空历史
    clearHistory() {
      this.config.history = []
    }
  }
})
