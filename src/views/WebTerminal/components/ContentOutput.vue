<script setup lang="ts">
import smartText from '@/utils/smartText'
import OutputType = WebTerminal.OutputType
import { computed, toRefs } from 'vue'

interface OutputProps {
  output: OutputType
}

const props = defineProps<OutputProps>()
const { output } = toRefs(props)
const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return ''
  }
  switch (output.value.status) {
    case 'info':
      return '#909399'
    case 'success':
      return '#19be6b'
    case 'warning':
      return '#ff9900'
    case 'error':
      return '#c0300f'
    case 'system':
      return '#bfc4c9'
    default:
      return ''
  }
})
</script>

<template>
  <div class="content-output flex items-center my-[5px]">
    <template v-if="output.type === 'text'">
      <div
        v-if="outputTagColor"
        class="p-[3px] mr-[10px] rounded-[5px]"
        :class="`bg-[${outputTagColor}]`"
      >
        {{ output.status }}
      </div>
      <span v-if="output.type === 'text'" v-html="smartText(output.text)" />
    </template>
    <component
      :is="output.component"
      v-if="output.type === 'component'"
      v-bind="output.props ?? {}"
    />
  </div>
</template>

<style scoped>
.content-output :deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>
