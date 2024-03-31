import { login } from "@/core/common/commands/Login/login"
import { LOCAL_TOKEN_KEY } from "@/constant/auth"
import { useUserStore } from "@/stores/user"

/**
 * @description 登录命令
 * @param {{}} args
 */
export const loginCommand: Command.ICommandType = {
    main: "login",
    name: "登录",
    desc: "使用用户密码登录",
    alias: ["login"],
    options: [
        {
            key: "username",
            alias: ["u"],
            desc: "用户名",
            type: "string",
            required: true
        },
        {
            key: "password",
            alias: ["p"],
            desc: "密码",
            type: "string",
            required: true
        }
    ],
    // @ts-ignore
    action: async ({ options }) => {
        const username = options.username ?? options.u
        const password = options.password ?? options.p
        if (!username) {
            return {
                type: "text",
                resultList: [
                    {
                        type: "text",
                        text: "用户名不能为空",
                        status: "error"
                    }
                ]
            }
        }
        if (!password) {
            return {
                type: "text",
                resultList: [
                    {
                        type: "text",
                        text: "密码不能为空",
                        status: "error"
                    }
                ]
            }
        }
        // 登录
        // const result = await login({ username, password })
        const result = await useUserStore().loginHandler({ username, password })
        console.log(result)
        if (result.data) {
            localStorage.setItem(LOCAL_TOKEN_KEY, result.data)
            localStorage.setItem("username", username)
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: `${username}登录成功`,
                        status: "success"
                    }
                ]
            }
        } else {
            return {
                type: "command",
                resultList: [
                    {
                        type: "text",
                        text: "登录失败哦~",
                        status: "error"
                    }
                ]
            }
        }
    },
    collapsible: true
}
