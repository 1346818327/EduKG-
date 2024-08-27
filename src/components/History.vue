<script setup>
import { ref } from 'vue';
const historyArray = ['你好，这是第二次的AI问答111111111111']
let nowdata = ref('这是第一条信息')
</script>

<template>
    <div class="history_bbox">
        <div class="newsear">
            <div class="new">
                新建对话
            </div>
            <div class="search">
                搜索历史记录
            </div>
        </div>
        <div class="historybox">
            <div class="now" v-show="1">
                <div class="historytime">
                    当前
                </div>
                <div class="history">
                    {{ nowdata }}
                </div>
            </div>
            <div class="historytime">
                先前
            </div>
            <div v-for="item in historyArray" class="history">
                {{ item }}
            </div>
        </div>

    </div>

</template>
<style scoped>
.historytime {
    text-indent: 2px;
    font-size: 14px;
}

.history {
    width: 80%;
    height: 60px;
    background-color: rgb(247, 248, 252);
    border: 1px solid rgb(191, 191, 191);
    line-height: 60px;
    text-align: center;
    border-radius: 12px;
    margin: 10px auto;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search {
    width: 80%;
    height: 60px;
    background-color: rgb(247, 248, 252);
    border: 1px solid rgb(191, 191, 191);
    line-height: 60px;
    text-align: center;
    border-radius: 12px;
    cursor: pointer;
}

.new {
    width: 80%;
    height: 60px;
    background-color: rgb(94, 89, 232);
    line-height: 60px;
    color: white;
    text-align: center;
    border-radius: 12px;
    cursor: pointer;
}

.historybox {
    width: 100%;
    height: 460px;
    align-items: center;


}

.newsear {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 160px;
}

.history_bbox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 300px;
    border-radius: 12px;
    background-color: rgb(247, 248, 252);
    border: 1px solid rgb(191, 191, 191);
}
</style>
