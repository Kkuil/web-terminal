<script setup lang="ts">
import useTheme, { ThemeEnum } from "@/hooks/useTheme"
import { ref } from "vue"

const themeHook = useTheme()
const theme = ref<boolean>(false)

const onChange = () => {
    themeHook.switchTheme(
        ThemeEnum.DARK === themeHook.theme.value ? ThemeEnum.LIGHT : ThemeEnum.DARK
    )
}
</script>

<template>
    <el-switch v-model="theme" @change="onChange">
        <template #active-action>
            <i class="iconfont icon-sun"></i>
        </template>
        <template #inactive-action>
            <i class="iconfont icon-moon"></i>
        </template>
    </el-switch>
</template>

<style scoped lang="scss"></style>