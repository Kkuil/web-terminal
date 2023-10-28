import { defineStore } from "pinia"

export const useTerminalStore = defineStore("terminal", {
    state: () => ({
        config: {
            isShowWelcome: true,
            history: [] as string[],
            SSHHistory: [] as string[]
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
        },
        // 增加ssh历史
        addSSHHistory(command: string) {
            this.config.SSHHistory.push(command)
        },
        // 清空ssh历史
        clearSSHHistory() {
            this.config.SSHHistory = []
        }
    }
})
