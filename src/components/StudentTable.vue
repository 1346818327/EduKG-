<template>
  <div class="main">
    <div class="table-container">
      <div class="table-header">
        班级管理表格
        <el-button type="primary" style="margin-left: 20px;" @click="openAddDialog">
          添加学生
        </el-button>
        
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column label="姓名" prop="name" width="250"></el-table-column>
        <el-table-column label="学号" prop="studentId" width="250"></el-table-column>
        <el-table-column label="联系方式" prop="contact" width="250"></el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="deleteStudent(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="addDialogVisible" title="添加学生" @close="resetForm">
        <el-form ref="addStudentForm" :model="studentForm" :rules="formRules" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="studentForm.studentId"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="studentForm.contact"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addStudent">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import * as XLSX from 'xlsx';
import {genFileId,  UploadProps, UploadRawFile } from 'element-plus';

// 模拟的班级数据
const mockData = ref([
  {
    name: '张三',
    studentId: '20230101',
    contact: '13800138000'
  },
  {
    name: '李四',
    studentId: '20230102',
    contact: '13900139000'
  },
  {
    name: '王五',
    studentId: '20230103',
    contact: '13700137000'
  }
]);

const tableData = ref(mockData.value);

// 添加学生对话框状态
const addDialogVisible = ref(false);

// 表单数据和验证规则
const studentForm = ref({
  name: '',
  studentId: '',
  contact: ''
});

const formRules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' }
  ],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' }
  ]
});

// 表单引用
const addStudentForm = ref(null);

// 打开添加学生对话框
const openAddDialog = () => {
  addDialogVisible.value = true;
  resetForm();
};

// 关闭添加学生对话框
const closeAddDialog = () => {
  addDialogVisible.value = false;
};

// 重置表单
const resetForm = () => {
  studentForm.value = {
    name: '',
    studentId: '',
    contact: ''
  };
  // 清除验证信息
  addStudentForm.value?.clearValidate();
};

// 添加学生
const addStudent = () => {
  addStudentForm.value?.validate((valid) => {
    if (valid) {
      tableData.value.push(studentForm.value);
      ElMessage.success('学生添加成功');
      closeAddDialog();
    } else {
      ElMessage.error('表单填写不完整');
    }
  });
};

// 删除学生
const deleteStudent = (row) => {
  ElMessage.success('学生删除成功');
  const index = tableData.value.indexOf(row);
  if (index !== -1) {
    tableData.value.splice(index, 1);
  }
};


</script>

<style scoped>
.main {
  margin: 20px;
}

.table-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px auto;
}
</style>