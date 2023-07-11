/**
 * 规定:
 * 1. 命令与参数之间，参数与参数之间，参数与选项之间和命令与选项之间用空格分割
 * 2. 只允许出现命令后面跟参数，参数后面跟选项（例如：正确写法：todo hours -t 12，错误写法：todo -t 12 hours）
 * 3. 命令，参数和选项都是以字符串形式存在，并对大小写不敏感
 * 4. 具有相同名称的参数可以覆盖同一个选项（参数亦如此）（例如：todo -t 12 -t 20,那么解析出来的选项将为20, todo -t 12 --time 20，解析出来的选项为12）
 * 5. 选项的简写和全写将被视为同一个选项（例如：todo -t 12 和 todo --time 12）
 */

/**
 * @description 解析命令
 * @param command
 * @return Command.CommandParamsResultType
 */
export default (command: string): Command.CommandParsedResultType => {
  // 将命令统一转为小写，并按照空格分割
  const commandSlice: string[] = command.toLowerCase().split(' ')
  const params: string[] = []
  // 选项开始的位置
  let optionIndex: number = 1
  console.log('commandSlice: ', commandSlice)
  // 解析参数
  for (let i = 1; i < commandSlice.length; i++) {
    if (!commandSlice[i].startsWith('-')) {
      params.push(commandSlice[i])
    }
    // 记录选项开始的位置
    optionIndex = i
    break
  }
  // 解析选项
  const options: Record<string, string> = {}
  commandSlice.slice(optionIndex).forEach((option, index) => {
    if (option.startsWith('--')) {
      const optionName: string = option.slice(2)
      options[optionName] = ''
    } else if (option.startsWith('-')) {
      const optionName = option.slice(1)
      options[optionName] = ''
    } else {
      const preOption = commandSlice.slice(optionIndex)[index - 1]
      if (preOption.startsWith('--')) {
        const optionName = preOption.slice(2)
        options[optionName] = option
      } else if (preOption.startsWith('-')) {
        const optionName = preOption.slice(1)
        options[optionName] = option
      }
    }
  })
  return {
    originCommand: command,
    main: commandSlice[0],
    params,
    options,
    subCommands: {}
  }
}
