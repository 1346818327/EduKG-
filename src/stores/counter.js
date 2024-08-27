import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref(0)
  const username = ref('')
  const email = ref('')
  const role = ref('')
  const avatar = ref('')
  return {userId,username,email,role,avatar} 
})

