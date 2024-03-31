<script setup lang="ts">
import WebTerminal from "@/views/WebTerminal/WebTerminal.vue"
import { LOCAL_BG_KEY } from "@/constant/global"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

window.document.body.style.background = `url(${localStorage.getItem(LOCAL_BG_KEY)})`

userStore.authHandler()
</script>

<template>
    <WebTerminal />
    <!--    <div class="support fixed bottom-[10px] right-[10px] text-sm text-white">-->
    <!--        此项目的灵感来自于-->
    <!--        <a href="https://github.com/liyupi" class="underline text-[#0094ff]">鱼皮</a> 的-->
    <!--        <a href="https://github.com/liyupi/yuindex" class="underline text-[#0094ff]">yuindex</a> 项目-->
    <!--    </div>-->
</template>

<style scoped lang="scss"></style>
