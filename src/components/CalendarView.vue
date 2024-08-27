<template>
    <el-calendar>
        <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
            <p v-if="DateStore.customContents[data.day]">{{ DateStore.customContents[data.day] }}</p>
            {{ data.isSelected ? '✔️' : '' }}
            </p>
        </template>
    </el-calendar>
</template>

<script setup>
import { useDateStore } from '@/stores/DateStore';
import { ref } from 'vue';

const DateStore = useDateStore()

</script>

<style scoped>
.custom-date-cell {
    cursor: pointer;
    /* 自定义样式 */
}
</style>