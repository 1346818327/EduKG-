<template>
  <div class="read_body">
    <div class="nav">
      <div class="nav_fixed">
        <button @click="cli">dakai</button>
      </div>
    </div>

    <div class="read_container">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" infinite-scroll-distance = 200 ref="infinite_list">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
      </ul>
      <div v-if="showBox" class="showbox">
        <button @click="showBox.value = false" style="position: relative;">nihao</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
const showBox = ref(false)
const infinite_list = ref()
const load = () => {
  count.value += 2
}

const cli = () =>{
  console.log(1);
  infinite_list.style = 'width:900px'
  showBox.value = true
}

</script>

<style scoped>
.showbox{
  display: inline-block;

  width: 612px;
  height: 662px;
  background-color: white;
}
.nav_fixed {
  width: 100%;
  height: 41px;
  background-color: rgb(94, 89, 232);
  position: fixed;
  z-index: 999;

}

.nav {
  width: 100%;
  height: 41px;
  background-color: rgb(94, 89, 232);
  z-index: 999;
}

.infinite-list {
  display: inline-block;
  width: 100%;
  height: 662px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: rgb(230, 230, 230);
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1122px;
  width: 803px;
  background: white;
  margin: 10px auto;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>
