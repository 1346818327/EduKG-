<template>
    <div class="titlebox">
        <div class="title">
            <h2>课程详细</h2>
        </div>
        <div class="coursebox">
            <div class="course-info">
                <h3>课程名: <span class="course-name">{{ courseMessage }}</span></h3>
                <h3>任课老师: <span class="teacher-name">{{ courseTeacher }}</span></h3>
            </div>
        </div>
        <div class="chapterbox">
            <TeacherCourseChapter />
        </div>
        <div class="title">
            <h2>课程文件上传</h2>
        </div>
        <div class="chapterbox">
            <Upload courseMessage/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TeacherCourseChapter from './TeacherCourseChapter.vue';
import Upload from './Upload.vue';

import { useUserStore } from '@/stores/counter';
const userStore = useUserStore()

const route = useRoute();
const courseMessage = ref(route.query.message || '暂无课程名');
const courseTeacher = ref(userStore.username || '暂无任课老师');
</script>

<style scoped>
.titlebox {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.coursebox {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.course-info h3 {
    font-size: 24px;
    color: #333;
    margin: 10px 0;
}

.course-name,
.teacher-name {
    color: #007BFF;
    font-weight: bold;
}

.chapterbox {
    margin: 20px auto;
    width: 1280px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>