<template>
    <div class="backbox">
        <div class="title">
            <h2>课程概况</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div class="v-class" v-for="(item, index) in courseArray" :key="index"
                    :style="{ backgroundColor: colors[index % colors.length] }"
                    @click="openCourse(item.message, item.teacher)">
                    {{ item.message }}
                </div>
            </div>
        </div>
        <div class="title">
            <h2>日程安排</h2>
        </div>
        <div class="calendarLook">
            <CalendarView />
        </div>
        <div class="title">
            <h2>我的班级</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div class="v-class" v-for="(item, index) in classArray" :key="index"
                    :style="{ backgroundColor: colors[index % colors.length] }"
                    @click="openClass(item.courseName, item.teacher)">
                    {{ item.courseName + item.classNumber + '班' }}
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import CalendarView from './CalendarView.vue';
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const colors = ['#90EE90', '#FFC0CB', '#FFFACD', '#ADD8E6', '#FF6347'];


const courseArray = ref([
    { message: '计算机网络', teacher: '张三' },
    { message: '数据库', teacher: '李四' },
    { message: '汇编', teacher: '王五' },
]);
const classArray = ref([
    { courseName: '计算机网络', classNumber: 1, teacher: '张三'},
    { courseName: '数据库', classNumber: 1,teacher: '李四' },
]);

function openCourse(message, teacher) {
    router.push({
        path: '/teacher/TeacherCourseDetail',
        query: { message, teacher }
    });
}
function openClass(message, teacher) {
    router.push({
        path: '/teacher/TeacherClassDetail',
        query: { message, teacher }
    });
}
</script>

<style scoped>
.calendarLook {
    width: 1280px;
    margin: 5px auto;
    padding: 5px;
}

.v-class:hover {
    transform: scale(1.03);
    cursor: pointer;
}

.v-class {
    width: 300px;
    height: 90px;
    font-size: 40px;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    margin: 0 10px;
}

.course-container {
    width: 1280px;
    height: 120px;
    background-color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;

}

.classLook {
    width: 1280px;
    margin: 5px auto;
    padding: 5px;
}

.backbox {
    background-color: rgb(236, 240, 245);
}

.title {
    margin: 5px 8px;
}
</style>