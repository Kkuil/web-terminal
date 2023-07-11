import { commandMap } from './commandRegister'
import { useCommandStore } from '@/stores/command'
import { useHistoryStore } from '@/stores/history'

/**
 * @description 命令执行器，将拿到的解析好的命令进行执行
 * @param parsedCommand
 */
export default async function (parsedCommand: Command.CommandParsedResultType) {
  console.log(parsedCommand)
  const commandStore = useCommandStore()
  const historyStore = useHistoryStore()
  // 添加到历史记录
  historyStore.addHistory(parsedCommand.originCommand)
  // 判断命令是否存在
  if (!commandMap[parsedCommand.main]) {
    commandStore.addOutput(parsedCommand.originCommand, {
      type: 'text',
      text: `命令 ${parsedCommand.main} 不存在`,
      status: 'error'
    })
    return
  }

  // 增加命令输出
  commandStore.addOutput(
    parsedCommand.originCommand,
    (await commandMap[parsedCommand.main].action({
      params: parsedCommand.params as string[],
      options: parsedCommand.options as Record<string, string>
    })) as WebTerminal.OutputType
  )
  if (parsedCommand.main === 'clear' || parsedCommand.main === 'cls') {
    commandStore.clear()
  }
}
