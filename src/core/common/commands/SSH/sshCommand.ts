import { initConnection, pushMessageToWs } from "@/core/utils/websocket/websocket"
import {
    getValue,
    LOCAL_HOST_KEY,
    LOCAL_PASSWORD_KEY,
    LOCAL_PORT_KEY,
    LOCAL_USERNAME_KEY
} from "@/core/common/commands/SSH/sshConst"
import { useCommandStore } from "@/stores/command"

/**
 * @description 登录命令
 * @param {{}} args
 */
export const sshCommand: Command.ICommandType = {
    main: "ssh",
    name: "ssh",
    desc: "ssh连接",
    alias: ["ssh"],
    options: [
        {
            key: "host",
            alias: ["h"],
            desc: "主机号",
            type: "string",
            required: true
        },
        {
            key: "port",
            alias: ["p"],
            desc: "端口号 默认22",
            type: "string",
            required: true
        },
        {
            key: "username",
            alias: ["u"],
            desc: "用户名 默认root",
            type: "string",
            required: true
        },
        {
            key: "password",
            alias: ["P"],
            desc: "密码 默认123456",
            type: "string",
            required: true
        }
    ],
    // @ts-ignore
    action: async ({ options }) => {
        const commandStore = useCommandStore()
        const host = options.host ?? options.h ?? getValue(LOCAL_HOST_KEY)
        const port = options.port ?? options.p ?? getValue(LOCAL_PORT_KEY) ?? 22
        const username = options.username ?? options.u ?? getValue(LOCAL_USERNAME_KEY) ?? "root"
        const password = options.password ?? options.P ?? getValue(LOCAL_PASSWORD_KEY)

        const returnRes: WebTerminal.OutputType = {
            type: "text",
            resultList: []
        }

        console.log(host, port, username, password)
        if (!host) {
            returnRes?.resultList?.push({
                type: "text",
                text: "请输入主机地址",
                status: "error"
            })
            return returnRes
        }
        if (!username) {
            returnRes?.resultList?.push({
                type: "text",
                text: "请输入用户名",
                status: "error"
            })
            return returnRes
        }
        if (!password) {
            returnRes?.resultList?.push({
                type: "text",
                text: "请输入密码",
                status: "error"
            })
            return returnRes
        }

        // 初始化ws连接
        initConnection()
        // 发消息
        setTimeout(() => {
            pushMessageToWs({
                main: "ssh",
                data: {
                    host: host,
                    port: port,
                    username: username,
                    password: password
                }
            })
        }, 2000)
        // 先保存数据信息
        commandStore.saveSSHLoginInfo({ host, port, username, password })
        return returnRes
    }
}
