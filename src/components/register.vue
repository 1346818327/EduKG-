<template>
    <Alert ref="alert" />
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
        :hide-required-asterisk="true">
        <el-form-item label="角色" prop="role" >
            <el-select v-model="ruleForm.role" placeholder="请选择角色">
                <el-option label="老师" value="teacher"></el-option>
                <el-option label="学生" value="student"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学号/工号" prop="user_job_num" >
            <el-input v-model="ruleForm.user_job_num" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" >
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" >
            <el-input v-model="ruleForm.checkPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" prop="user_name" >
            <el-input v-model="ruleForm.user_name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="user_email" >
            <el-input v-model="ruleForm.user_email" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" prop="user_phone" class="phone-form-item" >
            <el-input v-model="ruleForm.user_phone" type="text" autocomplete="off" />
            <el-button :loading="isSending" :disabled="isSending" @click="sendVerificationCode">
                {{ sendStatus }}
            </el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="verification_code" >
            <el-input v-model="ruleForm.verification_code" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="switchToLogin">去登陆</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter();

import Alert from './Alert.vue';
const alert = ref(null);

let timeoutId = null;

const ruleFormRef = ref<FormInstance>()
const isSending = ref(false)
const sendStatus = ref('发送短信')



const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入你的学号/工号'))
    }
    if (value.length < 1 || value.length > 16) {
        return callback(new Error('学号/工号长度必须小于16位'))
    }
    if (!/^\d+$/.test(value)) {
        return callback(new Error('工号只能包含数字'))
    }
    callback()
}

const checkPass = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入密码'))
    }
    if (value.length < 6 || value.length > 12) {
        return callback(new Error('密码长度为6到12个字符'))
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return callback(new Error('密码格式错误'))
    }
    callback()
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致"))
    } else {
        callback()
    }
}

const checkPhone = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入电话号码'))
    }
    if (!/^\d{11}$/.test(value)) {
        return callback(new Error('电话号码必须是11位整数'))
    }
    callback()
}

const checkName = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入姓名'))
    }
    if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
        return callback(new Error('姓名只能包含汉字'))
    }
    callback()
}

const checkEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入邮箱'))
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return callback(new Error('邮箱格式错误'))
    }
    callback()
}

const ruleForm = reactive({
    role: '',
    user_job_num: '',
    password: '',
    checkPassword: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    verification_code: '',
});
const rules = reactive<FormRules<typeof ruleForm>>({
    role: [{ required: true, message: '请选择角色', trigger: 'change' }],
    user_job_num: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: checkPass, trigger: 'blur' }],
    checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
    user_name: [{ validator: checkName, trigger: 'blur' }],
    user_email: [{ validator: checkEmail, trigger: 'blur' }],
    user_phone: [{ validator: checkPhone, trigger: 'blur' }],
    verification_code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})

const emit = defineEmits(['switchToLogin'])

const switchToLogin = () => {
    emit('switchToLogin')
}

const sendVerificationCode = async () => {
    if (isSending.value) return

    try {
        isSending.value = true
        sendStatus.value = '发送中'

        const response = await axios({
            url: 'http://8.137.104.90:8099/sendSmsPASTUSELESS',
            method: 'POST',
            data: JSON.stringify({ phone: ruleForm.user_phone }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        
        if (response.data.ok) {
            sendStatus.value = '发送成功'
            setTimeout(() => {
                sendStatus.value = '发送短信'
            }, 5000) // 5秒后重置按钮状态
        } else {
            sendStatus.value = '发送失败'
            setTimeout(() => {
                sendStatus.value = '发送短信'
            }, 5000) // 5秒后重置按钮状态
        }
        
    } catch (error) {
        console.error('Error sending verification code:', error)
        sendStatus.value = '发送失败'
        setTimeout(() => {
            sendStatus.value = '发送短信'
        }, 5000) // 5秒后重置按钮状态
    } finally {
        isSending.value = false
    }
}

const submitForm = () => {
    const formEl = ruleFormRef.value
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            const data = {
                role: ruleForm.role,
                user_job_num: ruleForm.user_job_num,
                password: ruleForm.password,
                user_name: ruleForm.user_name,
                user_email: ruleForm.user_email,
                user_phone: ruleForm.user_phone,
                verification_code: ruleForm.verification_code,
            }
            fetch('http://8.137.104.90:8099/register0720', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.status) {
                    return response.json()
                }
                throw new Error('验证码错误')
            }).then(data => {
                if (data.status) {
                    ElMessage({
                        message: '注册成功',
                        type: 'success',
                    })
                    setTimeout(()=>{
                        switchToLogin()
                    },2000)
                } else {
                    ElMessage({
                        message: '验证码错误',
                        type: 'error',
                    })
                }
            }).catch(error => {
                console.error('Error verifying code:', error)
                ElMessage({
                    message: '验证码验证失败',
                    type: 'error',
                })
            })
        } else {
            ElMessage({
                message: '上传失败',
                type: 'error',
            })
        }
    })
}

// 监听输入框值变化，0.3秒后触发验证
onMounted(() => {
    watch(() => ruleForm.user_job_num, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('job_num');
            }
        }, 300); // 0.3 秒后验证
    });
    watch(() => ruleForm.role, (newVal, oldVal) => {
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
    watch(() => ruleForm.checkPassword, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('password');
            }
        }, 300); // 0.3 秒后验证
    });
    watch(() => ruleForm.user_name, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('password');
            }
        }, 300); // 0.3 秒后验证
    });
    watch(() => ruleForm.user_email, (newVal, oldVal) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const formEl = ruleFormRef.value;
            if (formEl) {
                formEl.validateField('password');
            }
        }, 300); // 0.3 秒后验证
    });
    watch(() => ruleForm.user_phone, (newVal, oldVal) => {
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
.phone-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.phone-form-item .el-input__inner {
    width: 60%;
}

.phone-form-item:deep(.el-input) {
    width: 273px;
}

.phone-form-item .el-button {
    margin-left: 10px;
    white-space: nowrap;
}

.demo-ruleForm:deep(.el-form-item__content) {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>