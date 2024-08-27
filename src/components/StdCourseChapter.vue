<template>
    <div>
      <div v-for="chapter in chapters" :key="chapter.id" class="chapter-box">
        <div class="header">
          <h2>{{ chapter.name }}</h2>
        </div>
        <div v-for="knowledgePoint in chapter.knowledgePoints" :key="knowledgePoint.id" class="knowledge-point-box">
          <div class="header">
            <h3>{{ knowledgePoint.name }}</h3>
          </div>
          <div v-if="knowledgePoint.detail">
            <div class="detail">
              <p>{{ knowledgePoint.detail.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const chapters = reactive([
    {
      id: 1,
      name: '第一章',
      knowledgePoints: [
        {
          id: 2,
          name: '知识点1',
          detail: {
            id: 3,
            content: '这里是知识点1的详细内容'
          }
        }
      ]
    }
  ]);
  </script>
  <style scoped>
  .chapter-box, .knowledge-point-box {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header, .detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px auto;
  }
  
  .actions {
    display: flex;
    gap: 10px; /* 增加按钮之间的间距 */
  }
  
  .action-btn {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .action-btn:hover {
    background-color: #5a6268;
  }
  
  .remove-btn {
    background-color: #dc3545;
  }
  
  .remove-btn:hover {
    background-color: #c82333;
  }
  
  .add-btn {
    background-color: #28a745;
  }
  
  .add-btn:hover {
    background-color: #218838;
  }
  
  input[type="text"] {
    margin-left: 10px;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: calc(100% - 22px); /* 减去左右边距和边框宽度 */
  }
  
  span {
    cursor: pointer;
    margin-right: 10px;
    flex-grow: 1;
    text-align: left;
  }
  
  </style>