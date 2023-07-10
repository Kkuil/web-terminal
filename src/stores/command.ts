import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommandStore = defineStore('command', () => {
  // 命令输入
  const commandInput: Ref<WebTerminal.CommandInputType> = ref<WebTerminal.CommandInputType>({
    command: '',
    hint: ''
  })

  // 命令输出列表
  const listOutput = ref<WebTerminal.CommandOutputType[]>([
    {
      id: '1',
      command: '123',
      output: {
        type: 'text',
        text: 'Hello Web',
        status: 'success',
        collapsible: true
      }
    }
  ])

  // 执行命令
  const execCommand = (command: string) => {
    if (!command || !command.trim()) {
      return
    }
    // 清空命令输入
    commandInput.value.command = ''
    // 执行命令
    // 增加命令输出
    const newOutPut: WebTerminal.CommandOutputType = {
      id: Date.now().toString(),
      command,
      output: {
        type: 'text',
        text: 'Hello Web',
        status: 'success',
        collapsible: true
      }
    }
    listOutput.value.push(newOutPut)
  }

  return { commandInput, listOutput, execCommand }
})
