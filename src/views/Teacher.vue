<template>
    <div class="nav">
        <div class="imgbox">
            <img src="../assets/img/icofont.png" alt=""
                style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
        </div>
    </div>
    <div class="container_box">
        <div class="main_nav1">
            <router-link class="link" to="/teacher/TeacherMain">总览</router-link>
            <router-link class="link" to="/teacher/TeacherCoursemanage">课程管理</router-link>
            <router-link class="link" to="/teacher/TeacherClassManage">学生管理</router-link>
            <router-link class="link" to="/teacher/TeacherUpload">文件上传</router-link>
            <router-link class="link" to="/teacher/Datamanage">日程管理</router-link>
            <router-link class="link" to="/teacher/TeacherHomework">作业与评估</router-link>

        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
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
    background-color: rgb(236,240,245);
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