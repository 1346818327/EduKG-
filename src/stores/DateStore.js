import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDateStore = defineStore('data', () => {
    const customContents = ref({})
    return {customContents} 
  })