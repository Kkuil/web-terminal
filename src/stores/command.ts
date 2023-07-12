import { defineStore } from 'pinia'
import commandParser from '@/core/commandParser'
import commandExecutor from '@/core/commandExecutor'

export const useCommandStore = defineStore('command', {
  state: () => ({
    commandInput: {
      command: ''
    },
    listOutput: [] as WebTerminal.CommandOutputType[]
  }),
  actions: {
    // 提交命令
    submitCommand(command: string) {
      if (!command || !command.trim()) {
        return
      }
      // 清空命令输入
      this.commandInput.command = ''
      // 自动滚动到底部
      setTimeout(() => {
        const documentHeight = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight
        window.scrollTo(0, documentHeight - windowHeight)
      }, 50)
      // 1. 解析命令
      const parsedCommand = commandParser(command.trim())
      // 2. 执行命令
      commandExecutor(command, parsedCommand)
    },
    // 清屏
    clear() {
      this.listOutput = []
    },
    // 增加输出
    async addOutput(command: string, output: WebTerminal.OutputType | {}) {
      const newOutput: WebTerminal.CommandOutputType = {
        id: Date.now().toString(),
        command,
        output: await output
      }
      this.listOutput.push(await newOutput)
    }
  }
})
