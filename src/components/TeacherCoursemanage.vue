<template>
    <div class="backbox">
        <div class="title">
            <h2>我的课程</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div class="v-l" v-for="(items, index) in groupedItems" :key="index">
                    <div class="v-class" v-for="item in items" :key="item.message" :style="{ backgroundColor: getColorByIndex(index * 4 + items.indexOf(item)) }" @click="openCourse(item.message, item.teacher)">
                        {{ item.message }}
                    </div>
                    <div v-if="index === groupedItems.length - 1" class="v-class" @click="dialogFormVisible = true">
                        添加课程
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogFormVisible" title="添加课程" width="500">
            <el-form :model="form">
                <el-form-item label="课程名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="任课老师" :label-width="formLabelWidth">
                    <el-input v-model="form.teacher" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addCourse">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, computed ,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';


import { useUserStore } from '@/stores/counter';

const userStore = useUserStore()
import useAxios from '@/utils/useAxios';
const axiosClient = useAxios();

const router = useRouter()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    name: '',
    teacher: userStore.username,
})
const courseArray = ref([
    { message: '计算机网络' },  // 浅绿色
    { message: '数据库' },       // 浅红色
    { message: '汇编' },         // 浅黄色
    { message: '操作系统' },
]);
const groupedItems = computed(() => {
    const result = [];
    for (let i = 0; i < courseArray.value.length; i += 4) {
        result.push(courseArray.value.slice(i, i + 4));
    }
    return result;
});

async function syncCoursesWithBackend() {
    try {
        await axiosClient.post('/api/courses', courseArray.value);
        ElMessage.success('课程同步成功');
    } catch (error) {
        ElMessage.error('课程同步失败，请稍后再试');
        console.error('Error syncing courses:', error);
    }
}

 function addCourse() {
    const newCourse = {
        message: form.name,
    };
    if (courseArray.value.some(item => item.message === newCourse.message)) {
        ElMessage.error('课程名已存在');
    } else {    
        courseArray.value.push(newCourse);
        syncCoursesWithBackend()
        dialogFormVisible.value = false;
        form.name = '';
        form.teacher = '';
    }
}

function getColorByIndex(index) {
    const colors = [ '#90EE90', '#FFC0CB', '#FFFACD','#ADD8E6',];
    return colors[(index % 4) % colors.length];
}

function openCourse(message, teacher) {
    router.push({ 
        path: '/teacher/TeacherCourseDetail', 
        query: { message }
    });
}

async function fetchCourses() {
    try {
        const response = await axiosClient.get('/api/courses');
        courseArray.value = response.data;
    } catch (error) {
        ElMessage.error('获取课程列表失败，请稍后再试');
        console.error('Error fetching courses:', error);
    }
}

onMounted(()=>{
    fetchCourses()
})

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