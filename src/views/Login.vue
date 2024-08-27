<template>
    <div class="box">
        <div class="loginbox">
            <div class="login_t">
                <div class="imgbox">
                    <img src="../assets/img/login.png" alt="" style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
                </div>
            </div>
            <div class="login_b" v-show="login">
                <LoginForm @switchToRegister="onSwitchToRegister" />
            </div>
            <div class="login_b" v-show="register">
                <Register @switchToLogin="switchToLogin" />
            </div>
        </div>
    </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import Register from '@/components/register.vue'
import { reactive, ref } from 'vue'

const login = ref(true)
const register = ref(false)

const onSwitchToRegister = () => {
    register.value = true;
    login.value = false;
};
const switchToLogin = () => {
    register.value = false
    login.value = true
}
</script>

<style scoped>
.login_b {
    width: 450px;
    min-height: 220px;
    border-radius: 20px;
    margin: 0 auto;
    padding-bottom: 10px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}

.login_t {
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    background-color: rgb(94, 89, 232);
    border-radius: 20px 20px 0 0;
}

.loginbox {
    width: 600px;
    min-height: 300px;
    max-height: 612px;
    background-color: white;
    border-radius: 20px;
    margin: 30px auto;
}

.box {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -999;
    background-position: center;
    background-image: url('../assets//img/back_image1.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>