<template>
    <div class="backbox">
        <div class="title">
            <h2>我的班级</h2>
        </div>
        <div class="classLook">
            <div class="course-container">
                <div class="v-l" v-for="(items, index) in groupedItems" :key="index">
                    <div class="v-class" v-for="item in items" :key="item.message"
                        :style="{ backgroundColor: getColorByIndex(index * 4 + items.indexOf(item)) }"
                        @click="openCourse(item.courseName, userStore.username)">
                        {{ item.courseName + item.classNumber + '班' }}
                    </div>
                    <div v-if="index === groupedItems.length - 1" class="v-class" @click="dialogFormVisible = true">
                        添加班级
                    </div>
                </div>
                <div v-if="groupedItems.length === 0" class="v-class" @click="dialogFormVisible = true">
                    添加班级
                </div>
            </div>
        </div>
        <el-dialog v-model="dialogFormVisible" title="添加班级" width="500">
            <el-form :model="form">
                <el-form-item label="课程名" :label-width="formLabelWidth">
                    <el-select v-model="form.courseName" placeholder="请选择课程">
                        <el-option v-for="course in courseNames" :key="course" :label="course" :value="course">
                        </el-option>
                    </el-select>
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
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/counter';

const userStore = useUserStore()

const router = useRouter()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    courseName: '',
    teacher: userStore.username,
})

const courseNames = ref(['计算机网络', '数据库', '汇编', '操作系统']); // 课程名数组
const courseClassesCount = reactive({});

const courseArray = ref([
    { courseName: '计算机网络',classNumber:1,teacher: '张三'}, 
    { courseName: '数据库',classNumber:1,teacher: '李四'},     
    { courseName: '汇编',classNumber:1,teacher: '王五'},        
    { courseName: '操作系统',classNumber:1,teacher: '张三'},
    { courseName: '计算机网络',classNumber:2,teacher: '李四'}, 
    { courseName: '数据库',classNumber:2,teacher: '王五'},  
]);

const groupedItems = computed(() => {
    const result = [];
    for (let i = 0; i < courseArray.value.length; i += 4) {
        result.push(courseArray.value.slice(i, i + 4));
    }
    return result;
});

function addCourse() {
    let courseName = form.courseName;
    let teacher = form.teacher;
    
    // 查找当前课程名下的最大班级编号
    let maxClassNumber = courseArray.value.reduce((max, item) => {
        return item.courseName === courseName ? Math.max(max, item.classNumber) : max;
    }, 0);

    // 将班级编号设置为当前最大编号加1
    let newClassNumber = maxClassNumber + 1;

    // 向 courseArray 添加新课程
    courseArray.value.push({
        courseName: courseName,
        teacher: teacher,
        classNumber: newClassNumber,
    });

    // 更新班级数量（这一步可以省略，因为班级数量是通过数组长度来确定的）
    // courseClassesCount[courseName] = newClassNumber;

    // 清空表单
    dialogFormVisible.value = false;
    form.courseName = '';
    form.teacher = '';

    // 显示成功消息
    ElMessage.success(`成功添加${courseName} ${newClassNumber}班`);
}

function getColorByIndex(index) {
    const colors = ['#90EE90', '#FFC0CB', '#FFFACD', '#ADD8E6',];
    return colors[(index % 4) % colors.length];
}

function openCourse(message, teacher) {
    router.push({
        path: '/teacher/TeacherClassDetail',
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

.v-class {
    width: 300px;
    height: 90px;
    font-size: 40px;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    margin: 15px 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.v-class:hover {
    transform: scale(1.03);
    cursor: pointer;
}

.course-container {
    width: 1280px;
    background-color: white;
    border-radius: 12px;
    padding: 10px
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