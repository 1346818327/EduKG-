<template>
    <div v-show="visible" class="alert" @click.self="hide">
      <div class="alert-content">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    message: String,
    duration: {
      type: Number,
      default: 3000
    }
  });
  
  const emit = defineEmits(['show', 'hide']);
  
  const visible = ref(false);
  
  function show() {
    visible.value = true;
    emit('show');
    setTimeout(() => {
      visible.value = false;
      emit('hide');
    }, props.duration);
  }
  
  function hide() {
    visible.value = false;
    emit('hide');
  }
  
  watch(() => props.message, (newVal) => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  });
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    padding: 10px;
    transition: top 0.5s;
  }
  
  .alert-content {
    padding: 10px;
    background-color: white;
    color: black;
    display: inline-block;
  }
  </style>