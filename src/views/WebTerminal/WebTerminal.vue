<script setup lang="ts">
import WelcomeComp from "./components/WelcomeComp.vue"
import TerminalInput from "@/views/WebTerminal/components/common/TerminalInput.vue"
import TerminalOutputResultList from "@/views/WebTerminal/components/common/TerminalOutputResultList.vue"
import { useCommandStore } from "@/stores/command"
import { useTerminalStore } from "@/stores/terminal"
import { CommandTypeEnum } from "@/core/enums/CommandTypeEnum"
import SSHInput from "@/views/WebTerminal/components/ssh/SSHInput.vue"
import SSHOutputResultList from "@/views/WebTerminal/components/ssh/SSHOutputResultList.vue"
import { ref, watch } from "vue"
import ThemeComp from "@/views/WebTerminal/components/ThemeComp.vue"
import useFontSize, { FontSizeEnum } from "@/hooks/useFontSize"
import { useUserStore } from "@/stores/user"

const commandStore = useCommandStore()
const terminalStore = useTerminalStore()
const userStore = useUserStore()

const fontSizeHooks = useFontSize()

const dialogVisible = ref(false)

const fontSize = ref<string>("m")

watch(
    fontSize,
    (newVal) => {
        fontSizeHooks.switchFontSize(newVal as FontSizeEnum)
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div class="web-terminal w-screen min-h-screen overflow-x-hidden bg-[--bg-100] p-[15px]">
        <WelcomeComp v-if="terminalStore.config.isShowWelcome" />
        <TerminalOutputResultList
            v-if="commandStore.commandInfo.mode === CommandTypeEnum.COMMON"
            :list="commandStore.commandInfo.listOutput"
            class="my-[10px]"
        />
        <SSHOutputResultList
            v-else-if="commandStore.commandInfo.mode === CommandTypeEnum.SSH"
            :list="commandStore.commandInfo.sshOutput"
        />
        <TerminalInput v-if="commandStore.commandInfo.mode === CommandTypeEnum.COMMON" />
        <SSHInput
            v-else-if="commandStore.commandInfo.mode === CommandTypeEnum.SSH"
            class="my-[10px]"
        />
    </div>
    <div class="fixed bottom-[10px] right-[10px]">
        <span class="text-[--text-100]">man 命令可以查看你想输入的命令</span>
    </div>
    <div
        class="fixed top-[10px] right-[10px] flex-center cursor-pointer w-[35px] h-[35px] rounded-[5px] border-[1px] border-[--text-100] transition-all hover:border-[#ccc] hover:text-[#ccc]"
        title="设置"
        @click="dialogVisible = true"
    >
        <i class="iconfont icon-setting text-[--text-100]"></i>
    </div>
    <el-dialog v-model="dialogVisible" title="全局设置" width="500">
        <template #default>
            <div
                v-if="userStore.userInfo.username"
                class="font flex justify-between text-[17px] mb-[10px]"
            >
                <span>登录信息</span>
                <div class="flex-center">
                    <img
                        src="https://w.wallhaven.cc/full/72/wallhaven-72yzje.jpg"
                        class="w-[45px] h-[45px] rounded-full mr-[10px]"
                    />
                    <span>{{ userStore.userInfo.username }}</span>
                </div>
            </div>
            <div v-else class="font flex justify-between text-[17px] mb-[10px]">
                <span>暂未登录</span>
                <span>请使用login命令进行登录吧~</span>
            </div>
            <div class="font flex justify-between text-[17px]">
                <span>字体大小</span>
                <el-radio-group size="small" v-model="fontSize">
                    <el-radio-button label="小" value="s" />
                    <el-radio-button label="中" value="m" />
                    <el-radio-button label="大" value="l" />
                </el-radio-group>
            </div>
            <div class="theme flex justify-between mt-[5px] text-[17px]">
                <span>主题色</span>
                <ThemeComp />
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss">
.el-dialog {
    background-color: var(--bg-100) !important;

    * {
        color: var(--text-100) !important;
    }
}

.el-radio-group {
    .el-radio-button__inner {
        background-color: var(--bg-100) !important;
    }

    * {
        color: var(--text-100) !important;
    }
}

.el-radio-group.is-active {
    .el-radio-button__inner {
        background-color: var(--primary-100) !important;
    }
}

.web-terminal {
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
</style>
