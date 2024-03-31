import request from "@/utils/request"

/**
 * 登录
 * @param data
 */
export const login = (data: {
    username: string
    password: string
}): Promise<Global.ApiResult<string>> => {
    return request({
        url: "/user/login",
        method: "POST",
        data
    })
}

/**
 * 验证
 */
export const authLogin = (token: string): Promise<Global.ApiResult<{ username: string }>> => {
    return request({
        url: "/user/auth",
        method: "POST",
        headers: {
            token
        }
    })
}
