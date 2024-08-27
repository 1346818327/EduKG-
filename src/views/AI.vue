<script setup>
import History from '@/components/History.vue'
import AIUI from '@/components/AIUI.vue'
import Nav from '@/components/Nav.vue'
import { ref } from 'vue';

const windshow = ref();
const Wind = ref();
const navHot = ref();
const navOwn = ref();
let adshow1 = ref(true)
let adshow2 = ref(false)

const clkOwn = () => {
  adshow1.value = true;
  adshow2.value = false;
}

const clkHot = () => {
  adshow1.value = false;
  adshow2.value = true;
}

let timeId
const openWind = () => {
  clearTimeout(timeId)
  Wind.value.style = 'width: 250px;background-color:white;border: 1px solid rgb(200,200,200);';
  windshow.value.style = 'display:block;';
}

const closeWind = () => {
  timeId = setTimeout(() => {
    Wind.value.style = 'width: 45px;background-color: rgb(94,89,232);border: none;';
    windshow.value.style = 'display:none;';
  }, 1000)
}
</script>

<template>
  <Nav></Nav>
  <div class="background">
    <div class="main">
      <History />
      <AIUI />
    </div>
    <div class="right_window" @mouseenter="openWind" @mouseleave="closeWind" ref="Wind">
      <div class="win_show" ref="windshow">
        <div class="win_nav">
          <div :class="['nav_own', adshow1 ? 'active' : '']" ref="navOwn" @click="clkOwn">
            个人
          </div>
          <div :class="['nav_hot', adshow2 ? 'active' : '']" ref="navHot" @click="clkHot">
            热点
          </div>
        </div>
        <div class="wind_detail">
          <div class="own" v-show="adshow1">

          </div>
          <div class="hot" v-show="adshow2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hot{
  height: 590px;
  width: 250px;
  background-color: pink;
}
.own{
  height: 590px;
  width: 250px;
}
.active {
  background-color: rgb(94, 89, 232);
  color: white;
}
.nav_own {
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  height: 36px;
  border-radius: 20px 0 0 0;
  width: 125px;
  border-bottom: 1px solid rgb(191,191,191);
  border-right: 1px solid rgb(191,191,191);
}
.nav_hot {
  cursor: pointer;
  text-align: center;
  line-height: 36px;
  height: 36px;
  border-radius: 0 0 20px 0;
  width: 124px;
  border-bottom: 1px solid rgb(191,191,191);
  border-right: 1px solid rgb(191,191,191);
}
.win_show {
  display: none;
}
.win_nav {
  display: flex;
  height: 36px;
  width: 250px;
  border-radius: 20px 0 20px 0;
}
.aibox {
  height: 100%;
  width: 1060px;
  background-color: rgb(247, 248, 252);
  border-radius: 12px;
  border: 1px solid rgb(191, 191, 191);
}

.right_window {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 100%;
  translate: -100% 0;
  width: 45px;
  height: 631px;
  border-radius: 20px 0 0 20px;
  background-color: rgb(94, 89, 232);
  transition: all 0.3s;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 90%;
}

.background {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 631px;
  width: 100%;
}
</style>