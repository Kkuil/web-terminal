const { Client } = require("ssh2")
const { MessageTypeEnum } = require("./enums/MessageTypeEnum")

const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8091 })

wss.on("connection", (ws) => {
    console.log("新的客户端连接")

    ws.on("message", (msg) => {
        const message = msg.toString()
        const parsedMessage = JSON.parse(message)
        // 消息处理
        WsMsgMap[parsedMessage.main](ws, parsedMessage.data)
    })

    ws.send("websocket连接成功")
})

const WsMsgMap = {
    ssh: (ws, data) => {
        // 验参
        if (!data.host) ws.send("请输入主机地址")
        if (!data.username) ws.send("请输入用户名")
        if (!data.password) ws.send("请输入密码")

        const conn = new Client()

        conn.on("ready", () => {
            const message = {
                type: MessageTypeEnum.SSH_CONN_INFO,
                status: 1,
                data: "ssh连接成功"
            }
            ws.send(JSON.stringify(message))

            if (data.command) {
                conn.exec(data.command, (err, stream) => {
                    stream
                        .on("close", (code, signal) => {
                            ws.send(JSON.stringify({ data: "响应结束" }))
                            conn.end()
                        })
                        .on("data", (data) => {
                            const message = {
                                type: MessageTypeEnum.SSH_RESP_DATA,
                                data: data.toString()
                            }
                            ws.send(JSON.stringify(message))
                        })
                        .stderr.on("data", (data) => {
                            console.log("STDERR: " + data)
                        })
                })
            }
        })
            .connect({
                host: data.host,
                port: data.port ?? 22,
                username: data.username,
                password: data.password,
                timeout: 10000
            })
            .on("error", () => {
                const message = {
                    type: MessageTypeEnum.SSH_CONN_INFO,
                    status: 0,
                    data: "ssh连接失败"
                }
                ws.send(JSON.stringify(message))
            })
    }
}
