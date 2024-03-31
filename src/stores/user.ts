import type { Ref } from "vue"
import { ref } from "vue"
import { defineStore } from "pinia"
import { authLogin, login } from "@/core/common/commands/Login/login"
import { LOCAL_TOKEN_KEY } from "@/constant/auth"

interface LoginType {
    username: string
    password: string
}

export const useUserStore = defineStore("user", () => {
    const userInfo: Ref<{ username: string }> = ref({
        username: ""
    })

    /**
     * 登录
     * @param data
     */
    const loginHandler = async (data: LoginType) => {
        const result = await login(data)
        if (result.data) {
            userInfo.value.username = data.username
            return result
        } else {
            return {}
        }
    }

    /**
     * 验证
     */
    const authHandler = async () => {
        const token = localStorage.getItem(LOCAL_TOKEN_KEY)
        if (token) {
            const result = await authLogin(token)
            if (result.data) {
                userInfo.value.username = result.data.username
                return result
            } else {
                return {}
            }
        }
    }

    return { userInfo, loginHandler, authHandler }
})
