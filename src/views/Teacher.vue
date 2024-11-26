<template>
    <div class="nav">
        <div class="imgbox">
            <img src="../assets/img/icofont.png" alt=""
                style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
        </div>
        <div class="avatar">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="color: white;font-size: 24px;display: flex;align-items: center;">
                    <el-avatar :size="30" :src='userStore.avatar'/>
                    <span style="margin-left: 15px;">{{ userStore.username }}</span>
                    <el-icon class="el-icon--right">
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>

    </div>
    <div class="container_box">
        <div class="main_nav1">
            <router-link class="link" to="/teacher/TeacherMain">总览</router-link>
            <router-link class="link" to="/teacher/TeacherCoursemanage">课程管理</router-link>
            <router-link class="link" to="/teacher/TeacherClassManage">学生管理</router-link>
            <!-- <router-link class="link" to="/teacher/TeacherUpload">文件上传</router-link> -->
            <router-link class="link" to="/teacher/Datamanage">日程管理</router-link>
            <!-- <router-link class="link" to="/teacher/TeacherHomework">作业与评估</router-link> -->

        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/counter';
import { ElMessage } from 'element-plus';
import { useRouter ,useRoute} from 'vue-router';
const router = useRouter()

const userStore = useUserStore()

const handleCommand = (command) => {
    if (command == 'user') {
        console.log(command);

        ElMessage('跳转到个人中心')
    }
    else if (command == 'logout') {
        userStore.logout()
        localStorage.clear()
        router.push('/login')
    }
}
const route = useRoute();

watch(() => route.fullPath, (newPath) => {
    console.log(route.fullPath,newPath);
    
});



</script>

<style scoped>
.active {
    background-color: rgba(131, 127, 248, 0.211);
    border-right: 3px solid rgba(131, 127, 248, 0.8);
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
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
    min-width: 1536px;
    background-color: rgb(94, 89, 232);
}

.container_box {
    display: flex;
    height: 631px;
    width: 100%;
}

.avatar {
    float: right;
    min-width: 150px;
    height: 72px;
    margin-right: 70px;
    display: flex;
    align-items: center;
}
</style>