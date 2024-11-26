<template>
  <div class="ai">
    <div class="showbox" ref="showboxRef">
      <div v-for="msg in message" :key="msg.id"
        :class="{ 'from-user': msg.role === 'user', 'from-backend': msg.role === 'assistant' }">
        <div :class="{ 'user-message': msg.role === 'user', 'backend-message': msg.role === 'assistant' }">
          <p style="-webkit-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;" v-if="msg.role === 'user'" v-text="msg.content"></p>
          <p style="-webkit-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;" v-else v-html="msg.content"></p>
        </div>
      </div>
    </div>
    <div class="inputbox">
      <div class="ipt" @click="focusInput">
        <el-input class="eipt" v-model="input" style="width: 505px;height: 26px;
                  margin: 17px 20px ;
                  text-indent: 20px;
                  box-shadow: none;
                  border-radius: 40px;" placeholder="请输入你的想法" clearable />
        <div class="input_btn" @click="sendToBackend">发送</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';

const inputRef = ref()
const showboxRef = ref()
let input = ref('')
let flag = ref(0)
const message = ref([])
const sendToBackend = async () => {
  if (input.value.trim().length != 0 && flag.value == 0) {
    flag.value = 1
    const inputcontent = {
      role: 'user',
      content: input.value,
    }
    message.value.push(inputcontent)
    input.value = ''
    kimiApi(message.value)

    await nextTick()
    showboxRef.value.scrollTop = showboxRef.value.scrollHeight
  }
  else if (flag.value == 0) {
    ElMessage("请填写内容")
  }
  else {
    ElMessage("请等待内容生成完毕后继续发送")
  }
}
const apiKey = 'sk-GYYRZsaEK0gmFrtAXhUzj7iwRrdMxHPhFrYKg4Gv6gCtJ089'

const kimiApi = async (message) => {
  const index = message.length;
  const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "moonshot-v1-8k",
      messages: message,
      temperature: 0.3,
      stream: true,
    })
  });
  const reader = response.body.getReader();
  const textDecoder = new TextDecoder();
  message.push({
    role: 'assistant',
    content: ''
  });

  const updateMessage = (text) => {
    message[index].content += text;
    nextTick(() => {
      showboxRef.value.scrollTop = showboxRef.value.scrollHeight;
    });
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const str = textDecoder.decode(value);
    str.split('\n').forEach(line => {
      if (line) {
        if (line === 'data: [DONE]') {
          flag.value = 0
          return;
        }
        line = line.replaceAll('data: ', '');
        const data = JSON.parse(line);
        if (data.choices[0].finish_reason && data.choices[0].finish_reason === 'stop') {
          return;
        }
        if (data.choices[0].delta.content) {
          const text = data.choices[0].delta.content;

          updateMessage(text);
        }
      }
    });
  }
}


const props = defineProps({
  selectedItem: String
});
watch(() => props.selectedItem, (newVal) => {
  if (newVal) {
    input.value = newVal;
  }
});
</script>


<style scoped>
.input_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  height: 50.15px;
  width: 88px;
  background-color: rgb(94, 89, 232);
  border: none;
  margin-right: 10px;
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
  align-items: center;
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
  height: 100px;
  border-radius: 12px;
}

.showbox {
  width: 96%;
  /* 固定宽度 */
  height: 470px;
  overflow-y: auto;
  padding: 10px;
  background-color: rgb(247, 248, 252);
  border-radius: 12px;
  -webkit-user-select: text;
  /* Safari */
  -moz-user-select: text;
  /* Firefox */
  -ms-user-select: text;
  /* IE10+/Edge */
  user-select: text;
  /* Standard syntax */
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
  -webkit-user-select: text;
  /* Safari */
  -moz-user-select: text;
  /* Firefox */
  -ms-user-select: text;
  /* IE10+/Edge */
  user-select: text;
  /* Standard syntax */
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
  align-items: center;
  border-radius: 16px;
  padding-top: 4px;
  border: 2px solid rgb(169, 176, 216);
  overflow: hidden;
  background-color: rgb(237, 240, 246)
}
</style>