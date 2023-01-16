<template>
  <div class="app">
    <div class="app__wrapper blur">
      <span class="dots">
        <span @click="logout"></span>
        <span></span>
        <span></span>
      </span>
      <GeneralMenu />

      <div class="loading" v-if="loading">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <NuxtPage />
    </div>

    <div
      class="alert"
      v-if="alertStore.text"
      :class="alertStore.error ? 'error' : ''"
    >
      <p>{{ alertStore.text }}</p>
    </div>
  </div>
</template>



<script setup>
import { useAlertStore } from "@/store/alert.js";
import { useAuthStore } from "@/store/auth.js";
const alertStore = useAlertStore();

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>


<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  right: 40px;
  z-index: 9;
  padding: 20px;
  border-radius: 0 0 $br $br;
  background-color: $white;

  &.error {
    background-color: red;
    p {
      color: $white;
    }
  }
  p {
    color: $green;
  }
}
</style>