import { seeTimeCommand } from "@/core/common/commands/SeeTime/seeTimeCommand"
import { clearScreenCommand } from "@/core/common/commands/ClearScreen/clearScreenCommand"
import { changeBgCommand } from "@/core/common/commands/ChangeBg/changeBgCommand"
import { historyCommand } from "@/core/common/commands/History/historyCommand"
import { gotoCommand } from "@/core/common/commands/Goto/gotoCommand"
import { todoCommand } from "@/core/common/commands/Todo/todoCommand"
import { manCommand } from "@/core/common/commands/Man/manCommand"
import { resetCommand } from "@/core/common/commands/Reset/resetCommand"
import { loginCommand } from "@/core/common/commands/Login/loginCommand"
import { translateCommand } from "@/core/common/commands/Translate/translateCommand"
import { gameCommand } from "@/core/common/commands/Game/gameCommand"
import { sshCommand } from "@/core/common/commands/SSH/sshCommand"

const commandList: Command.ICommandType[] = [
    seeTimeCommand,
    clearScreenCommand,
    changeBgCommand,
    historyCommand,
    gotoCommand,
    todoCommand,
    manCommand,
    resetCommand,
    loginCommand,
    translateCommand,
    gameCommand,
    sshCommand
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
