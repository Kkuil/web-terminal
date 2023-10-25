import type { Ref } from "vue"
import { ref } from "vue"
import { defineStore } from "pinia"
import { login } from "@/core/commands/Login/login"

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
        }
    }

    return { userInfo, loginHandler }
})
