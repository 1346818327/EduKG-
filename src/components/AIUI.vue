

<template>
    <div class="ai">
        <div class="showbox" ref="showboxRef">
            <div v-for="msg in messages" :key="msg.id"
                :class="{ 'from-user': msg.from === 'user', 'from-backend': msg.from === 'backend' }">
                <div :class="{ 'user-message': msg.from === 'user', 'backend-message': msg.from === 'backend' }">
                    <p v-if="msg.from === 'user'" v-text="msg.message"></p>
                    <div v-else v-html="msg.renderedMessage"></div>
                </div>
            </div>
        </div>
        <div class="inputbox">
            <div class="ipt" @click="focusInput">
                <el-input ref="inputRef" class="eipt" v-model="input" style="width: 505px;height: 26px;
                  margin: 17px 20px ;
                  text-indent: 20px;
                  box-shadow: none;
                  border-radius: 40px;" placeholder="请输入你的想法" clearable />
                <button class="input_btn" @click="sendToBackend">发送</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import useAxios from '@/utils/useAxios';
import MarkdownIt from 'markdown-it';

const { post } = useAxios();
const data = ref(null);

const md = new MarkdownIt({
    html: true, // 允许 HTML 标签
    linkify: true, // 自动链接
    typographer: true, // 智能标点
});
const input = ref('');
const messages = ref([]);
const showboxRef = ref(null);
const inputRef = ref(null);
const formData = {
    "query": ''
}

function focusInput() {
    nextTick(() => {
        inputRef.value.focus();
    });
}

function sendToBackend() {
    if (input.value.trim() === '') {
        return; 
    }

    messages.value.push({ from: 'user', message: input.value, id: Date.now() });
    formData.query = input.value

    const simulatedResponse = async () => {
        try {
            const response = await post('/liaotian', formData);
            const markdownContent = response.data.response;
            console.log(markdownContent)
            const htmlContent = md.render(markdownContent.replace(/\\n/g, '<br>'));
            console.log(htmlContent);
            messages.value.push({ from: 'backend', message: markdownContent, renderedMessage: htmlContent, id: Date.now() });
        } catch (error) {
            console.error('请求失败:', error);
        }
    };
    simulatedResponse();

    // 清空输入框
    input.value = '';

    // 确保滚动条滚动到底部
    scrollToBottom();
}

onMounted(() => {
    watch(messages, () => {
        scrollToBottom();
    });
});

function scrollToBottom() {
    showboxRef.value.scrollTop = showboxRef.value.scrollHeight;
}
</script>


<style scoped>
.input_btn {
    color: white;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: rgb(94, 89, 232);
    margin: 4px 12px;
    border: none;
    outline: none;
}

.ipt:deep(.el-input__inner) {
    border: none;
    box-shadow: none;
}

.ipt:deep(.el-input__inner:hover) {
    border: none;
    box-shadow: none;
}

.ipt:deep(.el-input__inner:focus) {
    border: none;
    box-shadow: none;
}

.ipt:deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
}

.ipt:deep(.el-input__wrapper:hover) {
    border: none;
    box-shadow: none;
}

.ipt:deep(.el-input__wrapper:focus) {
    border: none;
    box-shadow: none;
}

.ipt {
    display: flex;
    align-self: center;
    width: 90%;
    height: 60px;
    background-color: white;
    border-radius: 40px;
}

.inputbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    border-radius: 12px;
}

.showbox {
    width: 100%;
    /* 固定宽度 */
    height: 495px;
    overflow-y: auto;
    padding: 10px;
    background-color: rgb(247, 248, 252);
    border-radius: 12px;
}

.from-user .user-message,
.from-backend .backend-message {
    display: block;
    width: 90%;
    padding: 20px;
    margin: 0 auto;
    border-radius: 8px;
    word-wrap: break-word;
    /* 自动换行 */
    white-space: pre-wrap;
    /* 保留空白符和换行符 */
    color: blue;
    margin-bottom: 10px;
    background-color: rgb(224, 223, 255);
}

.from-backend .backend-message {
    color: green;
    background-color: white;
}

.ai {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px; /* 添加内边距 */
    background-color: rgb(247, 248, 252);
    border-radius: 12px;
    overflow: hidden; /* 防止内容溢出 */
}
</style>