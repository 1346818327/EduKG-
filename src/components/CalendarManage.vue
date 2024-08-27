<template>
  <div class="title">
    <h2>我的日程</h2>
  </div>
  <div class="calendarLook">
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''" @click="selectDate(data)">
          {{ data.day.split('-').slice(1).join('-') }}
        <p v-if="DateStore.customContents[data.day]">{{ DateStore.customContents[data.day] }}</p>
        {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </div>

  <!-- 自定义内容输入模态框 -->
  <el-dialog v-model="dialogVisible" title="编辑日程">
    <el-input v-model="inputContent" placeholder="请输入日程"></el-input>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCustomContent">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useDateStore } from '@/stores/DateStore';
import { ref } from 'vue';

const DateStore = useDateStore()

const dialogVisible = ref(false);
const inputContent = ref('');
const selectedDate = ref(null);


const selectDate = (data) => {
  selectedDate.value = data.day; // 存储选中的日期
  dialogVisible.value = true; // 显示模态框
  console.log(selectedDate.value);

};

const saveCustomContent = () => {
  if (selectedDate.value) {
    DateStore.customContents[selectedDate.value] = inputContent.value; // 存储自定义内容
    dialogVisible.value = false; // 关闭模态框
    console.log(DateStore.customContents);

  }
};
</script>

<style scoped>
.custom-date-cell {
  cursor: pointer;
  /* 自定义样式 */
}

.title {
    margin: 8px 8px;
}
.calendarLook {
    width: 1256px;
    margin: 5px auto;
}
</style>