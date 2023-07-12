import { useCommandStore } from '@/stores/command'
import { useTerminalStore } from '@/stores/terminal'

/**
 * @description 清屏
 * @param {{}} args
 */
export const clearScreenCommand: Command.ICommandType = {
  main: 'clear',
  name: '清屏',
  desc: '清空屏幕',
  alias: ['cls'],
  action: (): WebTerminal.OutputType | {} => {
    const terminalStore = useTerminalStore()
    const commandStore = useCommandStore()
    // 清空欢迎
    terminalStore.hideWelcome()
    // 清空命令
    commandStore.clear()
    return {
      type: "text",
      text: "清空成功",
      status: 'success'
    }
  },
  collapsible: true
}
