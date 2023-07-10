import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

interface UserInfoType {
  username: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo: Ref<UserInfoType> = ref({
    username: '',
    email: ''
  })

  return { userInfo }
})
