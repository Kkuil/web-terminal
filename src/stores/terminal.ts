import { defineStore } from 'pinia'

export const useTerminalStore = defineStore('terminal', {
  state: () => ({
    config: {
      isShowWelcome: true
    }
  }),
  actions: {
    hideWelcome() {
      this.config.isShowWelcome = false
    }
  }
})
