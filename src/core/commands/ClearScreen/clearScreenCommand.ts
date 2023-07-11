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
    console.log(123)
    terminalStore.hideWelcome()
    // 清空命令
    commandStore.clear()
    return {}
  },
  collapsible: true
}
