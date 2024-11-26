import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useAxios from '@/utils/useAxios'
export const useDateStore = defineStore('data', () => {
  const customContents = ref({})
  const axiosClient = useAxios()
  async function updateDate() {
    const data = customContents.value
    try {
      await axiosClient.post('url', customContents.value);
      ElMessage.success('日程上传成功');
    } catch (error) {
      ElMessage.error('日程上传失败，请稍后再试');
      console.error('Error syncing courses:', error);
    }
  }
  async function getDate() {
    const data = customContents.value
    try {
      const res = await axiosClient.get('url');
      customContents.value = res.data;
      ElMessage.success('日程同步成功');
    } catch (error) {
      ElMessage.error('日程同步失败，请稍后再试');
      console.error('Error syncing courses:', error);
    }
  }
  return { customContents, updateDate,getDate }
})