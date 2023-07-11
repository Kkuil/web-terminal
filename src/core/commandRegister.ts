import { seeTimeCommand } from '@/core/commands/SeeTime/seeTimeCommand'
import { clearScreenCommand } from '@/core/commands/ClearScreen/clearScreenCommand'
import { changeBgCommand } from '@/core/commands/ChangeBg/changeBgCommand'
import { historyCommand } from '@/core/commands/history/historyCommand'

const commandList: Command.ICommandType[] = [
  seeTimeCommand,
  clearScreenCommand,
  changeBgCommand,
  historyCommand
]

/**
 * 命令字典
 */
const commandMap: Record<string, Command.ICommandType> = {}

// 处理命令别名
commandList.forEach((command) => {
  commandMap[command.main] = command
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
