import { MessageEventTypeMap } from "@/core/utils/websocket/wsConst"

export declare namespace WebsocketSpace {
    type TSSHCommand = {
        main: string
        data: {
            host: string
            port?: number
            username: string
            password: string
            command?: string
        }
    }
    type TMessageEventType = MessageEventTypeMap.SSH_CONN_INFO | MessageEventTypeMap.SSH_RESP_DATA
}
