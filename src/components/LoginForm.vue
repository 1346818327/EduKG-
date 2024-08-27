<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm" :hide-required-asterisk="true">
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
import axios from 'axios';

import { reactive, ref, watch, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/counter';
const UserStore = useUserStore()

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    role: '',
    job_num: '',
    password: '',
});

let timeoutId = null; // 用于存储 setTimeout 的 ID

const rules = reactive<FormRules<typeof ruleForm>>({
    role: [
        { required: true, message: '请选择角色', trigger: 'change' }
    ],
    job_num: [
        { required: true, message: '工号不能为空', trigger: 'blur' },
        { validator: checkJobNum, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur' }
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
            const LoginResponse = async () => {
                try {
                    const response = await axios({
                        url: 'http://8.137.104.90:8099/edukglogin0720',
                        method: 'POST',
                        data: data,
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // }
                    })
                    if(response){
                        UserStore.userId = response.data.userId
                        UserStore.username = response.data.username
                        UserStore.role = response.data.role
                        UserStore.email = response.data.email
                        UserStore.avatar = response.data.avatar
                    }
                    console.log(UserStore.userId);
                    
                    if(response.data.role=='teacher'){
                        router.push("/teacher")
                    }else{
                        router.push("/std")
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

onMounted(() => {
    watch(() => ruleForm.job_num, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('job_num');
            }
        }, 300); // 0.3 秒后验证
    });

    watch(() => ruleForm.password, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('password');
            }
        }, 300); // 0.3 秒后验证
    });
});
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