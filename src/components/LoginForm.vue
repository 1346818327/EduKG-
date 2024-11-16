<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100" class="demo-ruleForm"
        :hide-required-asterisk="true">
        <el-form-item label="身份" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择身份">
                <el-option label="老师" value="teacher"></el-option>
                <el-option label="学生" value="student"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="学号/工号" prop="job_num">
            <el-input v-model="ruleForm.job_num" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm">登陆</el-button>
            <el-button @click="goToRegister">去注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import useAxios from '@/utils/useAxios';
import { reactive, ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/counter';
const UserStore = useUserStore();

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    role: '',
    job_num: '',
    password: '',
});

const rules = reactive<FormRules<typeof ruleForm>>({
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
    job_num: [
        { required: true, message: '工号不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
});

function checkJobNum(rule, value, callback) {
    const regex = /^[a-zA-Z0-9]{2,14}$/;
    if (value === '') {
        callback(new Error('工号不能为空'));
    } else if (!regex.test(value)) {
        callback(new Error('工号格式错误'));
    } else {
        callback();
    }
}

function checkPassword(rule, value, callback) {
    const regex = /^[a-zA-Z0-9]{5,12}$/;
    if (value === '') {
        callback(new Error('密码不能为空'));
    } else if (!regex.test(value)) {
        callback(new Error('密码格式错误'));
    } else {
        callback();
    }
}

const submitForm = () => {
    const formEl = ruleFormRef.value;
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            const data = {
                role: ruleForm.role,
                job_num: ruleForm.job_num,
                password: ruleForm.password
            };
            const axiosClient = useAxios();
            async function LoginResponse() {
                try {
                    const url = '/edukglogin';
                    const response = await axiosClient.post(url, data);
                    const authorizationHeader = response.headers.authorization;
                    localStorage.setItem("token", authorizationHeader);
                    if (response) {
                        UserStore.userId = response.data.data.userId;
                        UserStore.username = response.data.data.username;
                        UserStore.role = response.data.data.role;
                        UserStore.email = response.data.data.email;
                        UserStore.avatar = response.data.data.avatar;
                        UserStore.saveState()
                    }
                    if (UserStore.role == "teacher") {
                        router.push("/teacher");
                    } else {
                        router.push("/std");
                    }
                } catch (error) {
                    console.error('请求失败:', error);
                }
            };
            LoginResponse();
        } else {
            console.error('Form is invalid');
        }
    });
};

const goToRegister = () => {
    emit('switchToRegister');
};

const emit = defineEmits(['switchToRegister']);
</script>

<style scoped>
.demo-ruleForm:deep(.el-form-item__content) {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.demo-ruleForm {
    padding: 10px;
}
</style>