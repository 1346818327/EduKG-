<template>
    <div class="backbox">
        <div class="title">
            <h2>我参与的课程</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div v-if="courseArray.length === 0" class="no-course-message">
                    您当前没有参与任何课程。
                </div>
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

function openCourse(message, teacher) {
    router.push({
        path: '/std/StdCourseDetail',
        query: { message, teacher }
    });
}
</script>
<style scoped>
.backbox {
    background-color: rgb(236, 240, 245);
}


.course-container {
    width: 1256px;
    height: 120px;
    background-color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;

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

.v-class:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.no-course-message {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #666;
    padding: 20px;
    margin: 10px 20px;
    border: 1px dashed #ccc;
    border-radius: 8px;
}


.calendarLook {
    width: 1256px;
    margin: 5px auto;
}


.course-container {
    width: 1256px;
    height: 120px;
    background-color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;

}

.classLook {
    width: 1256px;
    margin: 5px auto;
    padding: 5px;
}

.backbox {
    background-color: rgb(236, 240, 245);
}

.title {
    margin: 8px 8px;
}
</style>