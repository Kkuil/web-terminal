import { useCommandStore } from '@/stores/command'
import { useHistoryStore } from '@/stores/history'

/**
 * @description 命令执行器，将拿到的解析好的命令进行执行
 * @param parsedCommand
 */
export default function (originCommand: string, parsedCommand: Command.CommandParsedResultType) {
  const commandStore = useCommandStore()
  const historyStore = useHistoryStore()
  // 添加到历史记录
  historyStore.addHistory(parsedCommand.originCommand)

  // 增加命令输出
  commandStore.addOutput(
    originCommand,
    parsedCommand.action({
      params: parsedCommand.params ?? [],
      options: parsedCommand.options ?? {}
    })
  )
  if (
    parsedCommand.originCommand.startsWith('clear') ||
    parsedCommand.originCommand.startsWith('cls')
  ) {
    parsedCommand.action()
  }
}
