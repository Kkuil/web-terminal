import { useTerminalStore } from '@/stores/terminal'

/**
 * @description 重置配置
 */
export const resetCommand: Command.ICommandType = {
  main: 'reset',
  name: '重置',
  desc: '重置配置',
  // @ts-ignore
  action: ({ params }) => {
    const terminalStore = useTerminalStore()
    terminalStore.$reset()
    const resetText = {
      type: 'text',
      text: '重置成功',
      status: 'success'
    }
    if (params.length > 0) {
      return {
        type: 'command',
        resultList: [
          {
            type: 'text',
            text: `参数 ${params.join(',')} 是冗余的`,
            status: 'warning'
          },
          resetText
        ]
      }
    }
    return resetText
  }
}
