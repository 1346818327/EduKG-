<template>
  <div class="nav">
    <div class="imgbox">
      <img src="../assets/img/icofont.png" alt=""
        style="object-fit: contain; height: 64px;float: left;margin-left: 70px;">
    </div>
    <div class="avatar">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: white;font-size: 24px;display: flex;align-items: center;">
          <el-avatar :size="30" :src='userStore.avatar' />
          <span style="margin-left: 15px;">{{ userStore.username }}</span>
          <el-icon class="el-icon--right">
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div class="under_nav">
    <div class="prev_bt">
      <span>返回</span>
    </div>
    <div class="article_title">
      <!-- 文章名传入 -->
      <span>{{ article_title }}</span>
    </div>
  </div>
  <div class="main_container">
    <div class="main_l">
      <div class="kg_box">
        <d3 />
      </div>
      <div class="hotquestion_box">
        <div class="hot_title">热点问题</div>
      </div>
    </div>
    <div class="main_c">
      <div class="article">
        <!-- 文章内容填充 -->
      </div>
      <div class="page_turn">
        <div class="page_bt">
          上一页
        </div>
        <div class="page">
          当前页码
        </div>
        <div class="page_bt">
          下一页
        </div>
      </div>
    </div>
    <div class="main_r">
      <ai/>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

import { useUserStore } from '@/stores/counter';
const userStore = useUserStore()

import d3 from '@/components/d3.vue';
import ai from '@/components/ai.vue';
let article_title = '计算机网络'

</script>
<style scoped>
.page{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border: 2px solid rgb(169, 176, 216);
  border-radius: 16px;
  margin: 0 20px;
  padding: 0 20px;
}
.page_bt{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border: 2px solid rgb(169, 176, 216);
  border-radius: 16px;
  margin: 0 20px;
  padding: 0 20px;
}
.page_turn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 710px;
  height: 50px;
}
.article{
  border-radius: 16px;
  border: 2px solid rgb(169, 176, 216);
  width: 700px;
  height: 520px;
  margin: 0 auto;
}
.article_title {
  height: 30px;
  font-size: 22px;
  padding: 1px 40px;
  border: 1px solid black;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  transform: translateX(-125px);
}

.hot_title {
  margin: 10px 15px;
  font-size: 20px;
  font-weight: 800;
}

.kg_box {
  height: 210px;
  width: 300px;
  border-radius: 16px;
  border: 2px solid rgb(169, 176, 216);
  margin-bottom: 30px;
}

.hotquestion_box {
  height: 330px;
  width: 294.91px;
  border-radius: 16px;
  border: 2px solid rgb(169, 176, 216);
}

.avatar {
  float: right;
  min-width: 150px;
  height: 72px;
  margin-right: 70px;
  display: flex;
  align-items: center;
}

.nav {
  height: 72px;
  width: 100%;
  min-width: 1536px;
  background-color: rgb(94, 89, 232);
}

.under_nav {
  display: flex;
  align-items: center;
  height: 36px;
  width: 100%;
  min-width: 1536px;
  background-color: rgb(237, 240, 246)
}

.prev_bt {
  width: 100px;
  height: 28px;
  padding: 2px 15px;
  border: 1px solid black;
  text-align: center;
  margin-left: 25px;
  border-radius: 4px;
}

.main_container {
  width: 96%;
  min-width: 1474.56px;
  height: 570px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
}

.main_l {
  width: 300px;
}

.main_c {
  width: 710px;
}

.main_r {
  width: 442.37px;
}
</style>
