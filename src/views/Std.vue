<template>
    <div class="nav">
        <div class="imgbox">
            <img src="../assets/img/icofont.png" alt=""
                style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
        </div>
    </div>
    <div class="container_box">
        <div class="main_nav1">
            <router-link class="link" to="/std/StdMain">总览</router-link>
            <router-link class="link" to="/std/StdCoursemanager">课程管理</router-link>
            <router-link class="link" to="/std/Datamanage">日程管理</router-link>
            <!-- <router-link class="link" to="/std/StdHomework">我的作业</router-link> -->
            <div class="absolute-btn-container" @click="openAIAssistant">
                <!-- 按钮样式 -->
                <el-button type="primary" class="ai-assistant-btn">AI助手</el-button>
            </div>

            <el-drawer v-model="drawer" title="AI助手" :with-header="false"  
            size="50%" >
            <AIUI/>
            </el-drawer>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>

    </div>

</template>

<script setup>
import AIUI from '@/components/AIUI.vue';
import { ref } from 'vue';

const drawer = ref(false)

function openAIAssistant() {
    drawer.value = true; // 假设这里打开一个抽屉组件作为 AI 助手
}
</script>

<style scoped>
.absolute-btn-container {
    position: absolute;
    left: 20px; /* 按钮距离左边缘的距离 */
    bottom: 20px;
}

/* 按钮样式，设置为正方形 */
.ai-assistant-btn {
    width: 60px;
    /* 根据需要调整宽度以形成正方形 */
    height: 60px;
    padding: 0;
    /* 移除内边距以保持正方形 */
    border-radius: 4px;
    /* 根据需要调整圆角 */
}

.router-link-active {
    background-color: rgba(131, 127, 248, 0.211);
    border-right: 3px solid rgba(131, 127, 248, 0.8)
}

.link {
    display: block;
    width: 240px;
    height: 36px;
    font-size: 22px;
    line-height: 36px;
    text-decoration: none;
    text-align: center;
    color: black;
}

.main {
    width: 1296px;
    height: 631px;
    background-color: rgb(236, 240, 245);
    overflow: auto;
}

.main_nav1 {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 631px;
    border-right: 1px solid rgb(195, 195, 195);
}

.nav {
    height: 72px;
    width: 100%;
    background-color: rgb(94, 89, 232);
}

.container_box {
    display: flex;
    height: 631px;
    width: 100%;
}
</style>