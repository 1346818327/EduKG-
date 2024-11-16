import axios from "axios";
import { ref,nextTick } from "vue";
const apiKey = 'sk-GYYRZsaEK0gmFrtAXhUzj7iwRrdMxHPhFrYKg4Gv6gCtJ089'

export const kimiApi = async (message) => {
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
//一次性请求

// const url = "https://api.moonshot.cn/v1/chat/completions"
// const params = {
//   model: "moonshot-v1-8k",
//   messages: message,
//   temperature: 0.3,
//   stream:true,
// };
// try {
//   const response = await axios.post(url, params, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     }
//   })
//   const content = response.data
//   console.log(content);

//   return content;

// } catch (error) {
//   console.error("调用api报错:", error);
//   return null;
// }
