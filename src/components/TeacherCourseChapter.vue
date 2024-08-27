<template>
  <div>
    <div v-for="chapter in chapters" :key="chapter.id" class="chapter-box">
      <div class="header">
        <h2>
          <span v-if="!chapter.editing" @click="editChapterName(chapter)">{{ chapter.name }}</span>
          <input v-else v-model="chapter.tempName" @blur="updateChapterName(chapter)" @keyup.enter="updateChapterName(chapter)" placeholder="输入章节名称" />
        </h2>
        <div class="actions">
          <button @click="addKnowledgePoint(chapter)" class="action-btn add-btn">添加</button>
          <button @click="removeChapter(chapter)" class="action-btn remove-btn">删除</button>
        </div>
      </div>
      <div v-for="knowledgePoint in chapter.knowledgePoints" :key="knowledgePoint.id" class="knowledge-point-box">
        <div class="header">
          <h3>
            <span v-if="!knowledgePoint.editing" @click="editKnowledgePointName(knowledgePoint)">{{ knowledgePoint.name }}</span>
            <input v-else v-model="knowledgePoint.tempName" @blur="updateKnowledgePointName(knowledgePoint)" @keyup.enter="updateKnowledgePointName(knowledgePoint)" placeholder="输入知识点名称" />
          </h3>
          <div class="actions">
            <button v-if="!knowledgePoint.detail" @click="addDetail(knowledgePoint)" class="action-btn add-btn">添加</button>
            <button @click="removeKnowledgePoint(chapter, knowledgePoint)" class="action-btn remove-btn">删除</button>
          </div>
        </div>
        <div v-if="knowledgePoint.detail">
          <div class="detail">
            <p>
              <span v-if="!knowledgePoint.detail.editing" @click="editDetailContent(knowledgePoint)">{{ knowledgePoint.detail.content }}</span>
              <input v-else v-model="knowledgePoint.detail.tempContent" @blur="updateDetailContent(knowledgePoint)" @keyup.enter="updateDetailContent(knowledgePoint)" placeholder="添加" />
            </p>
            <div class="actions">
              <button @click="removeDetail(knowledgePoint)" class="action-btn remove-btn">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="addChapter" class="action-btn add-btn">添加章节</button>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const chapters = reactive([
  {
    id: 1,
    name: '第一章',
    editing: false,
    tempName: '',
    knowledgePoints: [
      {
        id: 2,
        name: '知识点1',
        editing: false,
        tempName: '',
        detail: null
      }
    ]
  }
]);

const addChapter = () => {
  chapters.push({
    id: Date.now(),
    name: '新章节',
    editing: false,
    tempName: '',
    knowledgePoints: []
  });
};

const addKnowledgePoint = (chapter) => {
  chapter.knowledgePoints.push({
    id: Date.now(),
    name: '新知识点',
    editing: false,
    tempName: '',
    detail: null
  });
};

const addDetail = (knowledgePoint) => {
  if (!knowledgePoint.detail) {
    knowledgePoint.detail = {
      id: Date.now(),
      content: '新知识点详情',
      editing: false,
      tempContent: ''
    };
  }
};

const removeChapter = (chapter) => {
  chapters.splice(chapters.indexOf(chapter), 1);
};

const removeKnowledgePoint = (chapter, knowledgePoint) => {
  chapter.knowledgePoints.splice(chapter.knowledgePoints.indexOf(knowledgePoint), 1);
};

const removeDetail = (knowledgePoint) => {
  knowledgePoint.detail = null;
};

const updateChapterName = (chapter) => {
  chapter.name = chapter.tempName;
  chapter.editing = false;
  console.log(`章节名称更新为: ${chapter.name}`);
};

const updateKnowledgePointName = (knowledgePoint) => {
  knowledgePoint.name = knowledgePoint.tempName;
  knowledgePoint.editing = false;
  console.log(`知识点名称更新为: ${knowledgePoint.name}`);
};

const updateDetailContent = (knowledgePoint) => {
  if (knowledgePoint.detail) {
    knowledgePoint.detail.content = knowledgePoint.detail.tempContent;
    knowledgePoint.detail.editing = false;
    console.log(`知识点详情更新为: ${knowledgePoint.detail.content}`);
  }
};

const editChapterName = (chapter) => {
  chapter.editing = true;
  chapter.tempName = chapter.name;
};

const editKnowledgePointName = (knowledgePoint) => {
  knowledgePoint.editing = true;
  knowledgePoint.tempName = knowledgePoint.name;
};

const editDetailContent = (knowledgePoint) => {
  if (knowledgePoint.detail) {
    knowledgePoint.detail.editing = true;
    knowledgePoint.detail.tempContent = knowledgePoint.detail.content;
  }
};
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