import { useCommandStore } from "@/stores/command"
import {
    getValue,
    LOCAL_HOST_KEY,
    LOCAL_PASSWORD_KEY,
    LOCAL_PORT_KEY,
    LOCAL_USERNAME_KEY
} from "@/core/common/commands/SSH/sshConst"
import { CommandTypeEnum } from "@/core/enums/CommandTypeEnum"
import { pushMessageToWs } from "@/core/utils/websocket/websocket"

/**
 * @description 命令执行器，将拿到的解析好的命令进行执行
 * @param command
 */
export default async function (command: string) {
    const commandStore = useCommandStore()

    // 1. 判断是否是清空命令
    if (command.trim() === "clear") {
        return commandStore.clearSSH()
    }
    // 1. 判断是否是退出命令
    if (command.trim() === "exit") {
        // 清空历史
        commandStore.clearSSH()
        return commandStore.changeMode(CommandTypeEnum.COMMON)
    }
    // 增加历史记录
    commandStore.addSSHOutput(command)
    // 2. 发送命令到后端进行解析
    // 2.1 验参
    const host = getValue(LOCAL_HOST_KEY)
    const username = getValue(LOCAL_USERNAME_KEY)
    const password = getValue(LOCAL_PASSWORD_KEY)
    const port = getValue(LOCAL_PORT_KEY)
    if (!host || !port || !username || !password) {
        commandStore.changeMode(CommandTypeEnum.COMMON)
        return commandStore.addOutput(command, {
            type: "text",
            text: "请先登录ssh",
            status: "error"
        })
    }
    const ssh = {
        main: "ssh",
        data: {
            host,
            port: Number(port),
            username,
            password,
            command
        }
    }
    pushMessageToWs(ssh)
}
