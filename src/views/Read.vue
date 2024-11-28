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
        <div style="display: flex;justify-content: center;align-items: center;"v-for="item in hot" @click="clickHot(item)">
          <span style="line-height: 35px;font-size: 18px;" >{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="main_c">
      <div class="article">
        <div style="line-height: 30px;font-size: 18px;">
          {{ story.content }}
        </div>
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
      <ai :selectedItem = "selectedItem"/>
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

const selectedItem = ref('');

const clickHot = (item) => {
  selectedItem.value = item;
};

const hot = [
  '计算机网络1','TCP/IP协议2','计算机网络3','TCP/IP协议4','计算机网络5','TCP/IP协议6','计算机网络7','TCP/IP协议8'
]


let  story = {
  content:`在一个遥远的国度里，有一个被茂密森林环绕的小村庄。这个村庄里的居民们过着简单而宁静的生活，他们与自然和谐共处，四季分明，春耕秋收，夏耘冬藏。村子的东边有一条清澈见底的小溪，溪水潺潺，终年不息，是村民们生活用水的主要来源。小溪的尽头是一座古老的石桥，桥的另一端是通往外界的唯一道路，但很少有人离开这个世外桃源。
在这个村庄里，有一个传说，每当月圆之夜，森林深处就会出现一条神秘的小径，通往一个隐藏的宝藏。这个宝藏据说是由一位古老的巫师留下的，他曾是这个村庄的守护者，拥有无尽的智慧和力量。巫师在临终前，将他的宝藏和秘密藏在了森林的某个角落，并设下了重重考验，只有最勇敢和纯洁的心才能找到并继承他的遗产。
故事的主角是一个名叫艾拉的年轻女孩，她有着一头金色的长发和明亮的蓝眼睛，是村里的孤儿，由全村人共同抚养长大。艾拉从小就对森林和那个传说充满了好奇，她梦想着有一天能够找到那个神秘的宝藏，用它的力量保护她的家园和亲人。
在艾拉十八岁生日的那天，她决定踏上寻找宝藏的旅程。村民们虽然担心，但还是为她准备了干粮和水，以及一些必要的装备。艾拉带着全村人的祝愿，踏上了通往森林深处的旅程。她穿过了茂密的树林，跨过了蜿蜒的小溪，最终在月圆之夜找到了那条传说中的小径。
艾拉的旅程充满了挑战和危险，她遇到了各种各样的生物，有的友好，有的则充满敌意。她凭借着智慧和勇气，一一克服了困难。在一次与森林中守护者的对决中，艾拉展现了她的纯洁之心，感动了守护者，从而获得了通往宝藏的线索。
经过数日的探索，艾拉终于找到了隐藏在瀑布后面的洞穴，里面堆满了金银财宝和古老的魔法书籍。在宝藏的中央，有一个发光的水晶球，里面封印着那位古老巫师的灵魂。巫师的灵魂告诉艾拉，真正的宝藏不是这些金银财宝，而是知识和智慧。他将他的知识传授给了艾拉，并告诉她，只有用这些知识去帮助他人，才是真正的宝藏。
艾拉带着新获得的知识和智慧回到了村庄，她没有带走任何金银财宝，但她带回了更为珍贵的东西。她用她学到的魔法帮助村民们治病，用她的智慧解决了村庄的难题，使得村庄变得更加繁荣和幸福。艾拉成为了新的守护者，她的故事也成为了村庄新的传说，流传在每一个月圆之夜。

这个故事告诉我们，真正的宝藏不在于物质的财富，而在于我们内心的善良和智慧。只有用这些去帮助他人，我们的生活才会变得更加有意义和丰富。`
}


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
  font-size: 18px; /* 可以根据需要调整 */
  line-height: 1.6; /* 可以根据需要调整 */
  font-family: Georgia, 'Times New Roman', serif; /* 可以根据需要调整 */
  background-color: #fff; /* 白色背景 */
  color: #333; /* 深色文字 */
  padding: 20px;
  text-align: justify; /* 两端对齐 */
  overflow-y: auto; /* 如果内容超出高度，显示滚动条 */
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
