import { defineStore } from "pinia"
import commandCommonParser from "@/core/common/commandCommonParser"
import { ref } from "vue"
import eventBus, { EventMap } from "@/utils/eventBus"
import { CommandTypeEnum } from "@/core/enums/CommandTypeEnum"
import commandCommonExecutor from "@/core/common/commandCommonExecutor"
import commandSSHExecutor from "@/core/ssh/commandSSHExecutor"
import {
    LOCAL_HOST_KEY,
    LOCAL_PASSWORD_KEY,
    LOCAL_PORT_KEY,
    LOCAL_USERNAME_KEY
} from "@/core/common/commands/SSH/sshConst"

export const useCommandStore = defineStore("command", () => {
    const commandInfo = ref<{
        mode: CommandTypeEnum
        commandInput: { command: string }
        listOutput: WebTerminal.CommandOutputType[]
        sshOutput: WebTerminal.SSHCommandOutputType[]
    }>({
        mode: CommandTypeEnum.COMMON,
        commandInput: {
            command: ""
        },
        listOutput: [] as WebTerminal.CommandOutputType[],
        sshOutput: [] as WebTerminal.SSHCommandOutputType[]
    })
    // 提交命令
    const submitCommand = (command: string) => {
        if (!command || !command.trim()) {
            return
        }
        // 清空命令输入
        commandInfo.value.commandInput.command = ""
        // 自动滚动到底部
        setTimeout(() => {
            const documentHeight = document.documentElement.scrollHeight
            const windowHeight = window.innerHeight
            window.scrollTo(0, documentHeight - windowHeight)
        }, 50)
        // 1. 解析命令
        const parsedCommand = commandCommonParser(command.trim())
        // 2. 执行命令
        commandCommonExecutor(command, parsedCommand)
    }
    const submitSSHCommand = (command: string) => {
        if (!command || !command.trim()) {
            return
        }
        // 清空命令输入
        commandInfo.value.commandInput.command = ""
        // 自动滚动到底部
        setTimeout(() => {
            const documentHeight = document.documentElement.scrollHeight
            const windowHeight = window.innerHeight
            window.scrollTo(0, documentHeight - windowHeight)
        }, 50)
        // 执行命令
        commandSSHExecutor(command)
    }
    // 清屏common
    const clear = () => {
        commandInfo.value.listOutput = []
    }
    // 清屏ssh
    const clearSSH = () => {
        commandInfo.value.sshOutput = []
    }
    // 增加输出
    const addCommonOutput = async (command: string, output: WebTerminal.OutputType | {}) => {
        const newOutput: WebTerminal.CommandOutputType = {
            id: Date.now().toString(),
            command,
            output: (await output) as WebTerminal.OutputType
        }
        commandInfo.value.listOutput.push(await newOutput)
    }
    // 增加输出
    const addSSHOutput = (command: string) => {
        const newOutput: WebTerminal.SSHCommandOutputType = {
            id: Date.now().toString(),
            command
        }
        commandInfo.value.sshOutput.push(newOutput)
    }

    // 改变模式
    const changeMode = (mode: CommandTypeEnum) => {
        commandInfo.value.mode = mode
    }

    // 保存SSH登录信息
    const saveSSHLoginInfo = (data: {
        host: string
        port: number
        username: string
        password: string
    }) => {
        localStorage.setItem(LOCAL_HOST_KEY, data.host)
        localStorage.setItem(LOCAL_PORT_KEY, String(data.port))
        localStorage.setItem(LOCAL_USERNAME_KEY, data.username)
        localStorage.setItem(LOCAL_PASSWORD_KEY, data.password)
    }

    // 保存删除登录信息
    const removeSSHLoginInfo = () => {
        localStorage.removeItem(LOCAL_HOST_KEY)
        localStorage.removeItem(LOCAL_PORT_KEY)
        localStorage.removeItem(LOCAL_USERNAME_KEY)
        localStorage.removeItem(LOCAL_PASSWORD_KEY)
    }

    // 监听连接成功事件
    eventBus.on(EventMap.WS_CONN_SUCCESS, () => {
        console.log(commandInfo.value.listOutput[commandInfo.value.listOutput.length - 1])
        commandInfo.value.listOutput[commandInfo.value.listOutput.length - 1].output.resultList = [
            {
                type: "text",
                text: "websocket连接成功",
                status: "success"
            }
        ]
    })

    // 监听ssh连接事件
    eventBus.on(EventMap.SSH_CONN_INFO, ({ data, status }) => {
        commandInfo.value.listOutput[
            commandInfo.value.listOutput.length - 1
        ].output.resultList?.push({
            type: "text",
            text: data as string,
            status: status ? "success" : "error"
        })
        if (status === 1) {
            changeMode(CommandTypeEnum.SSH)
        } else {
            // 删除登录信息
            removeSSHLoginInfo()
        }
    })

    // 监听ssh发送数据事件
    eventBus.on(EventMap.SSH_RESP_DATA, (data) => {
        console.log("data", data)
        commandInfo.value.sshOutput[commandInfo.value.sshOutput.length - 1].output = [
            data as string
        ]
    })

    return {
        commandInfo,
        submitCommand,
        submitSSHCommand,
        changeMode,
        saveSSHLoginInfo,
        removeSSHLoginInfo,
        clear,
        clearSSH,
        addOutput: addCommonOutput,
        addSSHOutput
    }
})
