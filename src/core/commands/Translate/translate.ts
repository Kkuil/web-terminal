import request from "axios"
import { TRANSLATE_APP_KEY, TRANSLATE_APP_SECRET } from "@/core/commands/Translate/translateConst"
import Crypto from "crypto-js"

/**
 * 登录
 * @param params
 */
export const translate = (params: {
    q: string
    from: string
    to: string
}): Promise<{ translation: string }> => {
    const salt = Date.now()
    const curtTime = Date.now()
    return request({
        url: "/youdao",
        method: "GET",
        params: {
            ...params,
            appKey: TRANSLATE_APP_KEY,
            salt,
            signType: "v3",
            curtTime,
            sign: Crypto.SHA256(
                params.q + params.from + params.to + salt + TRANSLATE_APP_SECRET + curtTime
            )
        }
    })
}
