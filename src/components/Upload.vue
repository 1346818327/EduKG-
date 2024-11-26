<template>
  <el-upload
    class="upload-demo"
    drag
    action="url"
    multiple
    :data="courseMessage"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将PDF文件拖动至此或<em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        上传PDF文件
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
const props = defineProps({
  courseMessage:String
})
</script>