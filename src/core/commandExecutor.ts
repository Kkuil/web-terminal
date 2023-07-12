import { useCommandStore } from '@/stores/command'
import { useTerminalStore } from '@/stores/terminal'

/**
 * @description 命令执行器，将拿到的解析好的命令进行执行
 * @param parsedCommand
 */
export default async function (
  originCommand: string,
  parsedCommand: Command.CommandParsedResultType
) {
  const commandStore = useCommandStore()
  const terminalStore = useTerminalStore()
  // 添加到历史记录
  terminalStore.addHistory(originCommand)

  // 增加命令输出
  await commandStore.addOutput(
    originCommand,
    parsedCommand.action({
      params: parsedCommand.params ?? [],
      options: parsedCommand.options ?? {}
    })
  )
  if (originCommand.startsWith('clear') || originCommand.startsWith('cls')) {
    parsedCommand.action()
  }
}
