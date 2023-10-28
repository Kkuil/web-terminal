import type { WebsocketSpace } from "@/core/utils/websocket/type.d.ts"
import eventBus, { EventMap } from "@/utils/eventBus"
import { MessageEventTypeMap } from "@/core/utils/websocket/wsConst"

let ws: WebSocket

export function initConnection() {
    ws = new WebSocket(import.meta.env.VITE_WS_ADDRESS as string)

    ws.addEventListener("open", () => {
        eventBus.emit(EventMap.WS_CONN_SUCCESS)
        console.log("websocket建立成功")
    })
    ws.addEventListener("close", () => {
        console.log("websocket关闭")
    })
    ws.addEventListener("message", (message) => {
        MessageHandler(message)
        console.log("websocket收到消息", message)
    })
    ws.addEventListener("error", () => {
        console.log("websocket发生错误")
    })
}

// 往 ws 发消息
export const pushMessageToWs = (data: WebsocketSpace.TSSHCommand) => {
    // 判断是否已经连接
    if (ws?.readyState !== 1) return
    ws?.send(JSON.stringify(data))
}

export const MessageHandler = (message: MessageEvent) => {
    const parsedMessage: { type: WebsocketSpace.TMessageEventType; status: 0 | 1; data: string } =
        JSON.parse(message.data)
    switch (parsedMessage.type) {
        case MessageEventTypeMap.SSH_CONN_INFO: {
            eventBus.emit(EventMap.SSH_CONN_INFO, {
                status: parsedMessage.status as number,
                data: parsedMessage.data
            })
            break
        }
        case MessageEventTypeMap.SSH_RESP_DATA: {
            eventBus.emit(EventMap.SSH_RESP_DATA, parsedMessage.data)
            break
        }
    }
}
