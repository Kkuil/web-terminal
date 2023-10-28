import type { Emitter } from "mitt"
import mitt from "mitt"

export const EventMap: Record<string, keyof Events> = {
    WS_CONN_SUCCESS: "ws_conn_success",
    SSH_CONN_INFO: "ssh_conn_info",
    SSH_RESP_DATA: "ssh_resp_data"
}

type Events = {
    // ws连接成功
    ws_conn_success: void
    // ssh连接信息
    ssh_conn_info: { status: number; data: string }
    // ssh数据
    ssh_resp_data: string
}

const eventHub: Emitter<Events> = mitt<Events>()
export default eventHub
