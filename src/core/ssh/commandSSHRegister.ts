import { clearScreenCommand } from "@/core/ssh/commands/ClearScreen/clearScreenCommand"

const commandList: Command.ICommandType[] = [clearScreenCommand]

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
