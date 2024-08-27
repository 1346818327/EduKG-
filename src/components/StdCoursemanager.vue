<template>
    <div class="backbox">
        <div class="title">
            <h2>我参与的课程</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div class="v-l" v-for="(items, index) in groupedItems" :key="index">
                    <div class="v-class" v-for="item in items" :key="item.message" :style="{ backgroundColor: getColorByIndex(index * 4 + items.indexOf(item)) }" @click="openCourse(item.message, item.teacher)">
                        {{ item.message }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()

const courseArray = ref([
    { message: '计算机网络', teacher: '张三' },  // 浅绿色
    { message: '数据库', teacher: '李四' },       // 浅红色
    { message: '汇编', teacher: '王五' },         // 浅黄色
    { message: '操作系统', teacher: '赵六' },
]);
const groupedItems = computed(() => {
    const result = [];
    for (let i = 0; i < courseArray.value.length; i += 4) {
        result.push(courseArray.value.slice(i, i + 4));
    }
    return result;
});

function getColorByIndex(index) {
    const colors = [ '#90EE90', '#FFC0CB', '#FFFACD','#ADD8E6',];
    return colors[(index % 4) % colors.length];
}

function openCourse(message, teacher) {
    router.push({ 
        path: '/std/StdCourseDetail', 
        query: { message, teacher }
    });
}
</script>

<style scoped>
.v-l {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
    margin: 15px 10px;
}

.course-container {
    width: 1280px;
    background-color: white;
    border-radius: 12px;
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