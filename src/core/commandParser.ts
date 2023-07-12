/**
 * 规定:
 *
 */
import getopts from 'getopts'

import { commandMap } from '@/core/commandRegister'

/**
 * @description 解析命令
 * @param command
 * @param parentCommand
 * @return Command.CommandParamsResultType
 */
const commandParser = (
  command: string,
  parentCommand: Record<string, Command.ICommandType> = commandMap
): Command.CommandParsedResultType => {
  // 去除命令首尾空格
  command = command.trim()
  // 分割命令
  const commandSlice = command.split(' ')
  // 主命令
  const main = commandSlice[0]
  // 判断主命令是否存在
  if (!parentCommand[main]) {
    return {
      action: () => ({
        type: 'text',
        text: `命令 ${main} 不存在`,
        status: 'error'
      })
    }
  }
  // 解析除了main以外的参数
  const options = getopts(commandSlice.slice(1))
  // 判断是否有子命令需要执行
  if (
    options._.length > 0 &&
    parentCommand[main].subCommands &&
    parentCommand[main].subCommands[options._[0]]
  ) {
    console.log(`${main}: `, options._.join(' '))
    // 递归解析子命令
    return commandParser(options._.join(' '), parentCommand[main].subCommands)
  }
  // 如果没有子命令，则将opts中_的值都作为参数传递
  return {
    action: parentCommand[main].action,
    params: options._,
    options
  }
}

export default commandParser
