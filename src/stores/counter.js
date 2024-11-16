import { createPinia } from 'pinia';
import { ref } from 'vue';
import { defineStore } from 'pinia'

const pinia = createPinia();

export const useUserStore = defineStore('user', () => {
  const userId = ref(0);
  const username = ref('');
  const email = ref('');
  const role = ref('');
  const avatar = ref('');

  const loadState = () => {
    const state = JSON.parse(localStorage.getItem('userStore'));
    if (state) {
      userId.value = state.userId;
      username.value = state.username;
      email.value = state.email;
      role.value = state.role;
      avatar.value = state.avatar;
    }
  };

  const saveState = () => {
    localStorage.setItem('userStore', JSON.stringify({
      userId: userId.value,
      username: username.value,
      email: email.value,
      role: role.value,
      avatar: avatar.value,
    }));
  };

  const logout = () => {
    userId.value = 0;
    username.value = '';
    email.value = '';
    role.value = '';
    avatar.value = '';
  };

  loadState();

  return { userId, username, email, role, avatar, logout, saveState };
});