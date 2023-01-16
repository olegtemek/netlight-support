<template>
  <div class="auth blur">
    <h1>Авторизация</h1>
    <span
      v-if="
        auth.errors.general ||
        loginStore.errors.general ||
        auth.errors.email ||
        auth.errors.password
      "
      >{{
        auth.errors.general ||
        loginStore.errors.general ||
        auth.errors.email ||
        auth.errors.password
      }}</span
    >
    <div class="auth__item">
      <h2>Емейл</h2>
      <input type="text" v-model="auth.email" />
    </div>
    <div class="auth__item">
      <h2>Пароль</h2>
      <input type="password" v-model="auth.password" />
    </div>

    <button @click="login">Войти</button>
  </div>
</template>



<script setup>
definePageMeta({
  layout: "empty",
});

import { useAuthStore } from "@/store/auth.js";
const loginStore = useAuthStore();

const auth = ref({
  email: null,
  password: null,
  errors: {
    email: null,
    password: null,
    general: null,
  },
});

const login = () => {
  auth.value.errors.email = null;
  auth.value.errors.password = null;
  auth.value.errors.general = null;

  !auth.value.email
    ? (auth.value.errors.email = "Заполните обязательные поля")
    : "";
  !auth.value.password
    ? (auth.value.errors.password = "Заполните обязательные поля")
    : "";

  if (
    !auth.value.errors.email &&
    !auth.value.errors.password &&
    !auth.value.errors.general
  ) {
    return loginStore.login(auth.value);
  }
};
</script>


<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: $white;
  padding: 20px;
  position: relative;
  z-index: 99;
  h1 {
    font-size: 18px;
    padding-bottom: 20px;
  }
  span {
    font-size: 14px;
    color: red;
  }

  &__item {
    position: relative;
    margin-bottom: 20px;
    span {
      position: absolute;
      color: red;
      font-size: 14px;
    }
    h2 {
      padding-bottom: 6px;
    }
    input {
      border-radius: $br;
      padding: 10px 20px;
    }
  }

  button {
    font-size: 18px;
    padding: 10px 20px;
    border: 1px solid $white;
    border-radius: $br;
    transition: $tr;
    &:hover {
      background-color: $white;
      color: $black;
    }
  }
}
</style>