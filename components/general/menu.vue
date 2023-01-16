<template>
  <div class="menu">
    <div class="menu__item">
      <router-link to="/"
        ><nuxt-icon name="general/house"></nuxt-icon>Главная</router-link
      >
    </div>
    <div class="menu__item">
      <router-link to="/note"
        ><nuxt-icon name="general/note"></nuxt-icon>Заметки</router-link
      >
    </div>
    <div class="menu__item">
      <router-link to="/access"
        ><nuxt-icon name="general/key"></nuxt-icon>Доступы</router-link
      >
    </div>
    <div class="menu__item">
      <router-link to="/status"
        ><nuxt-icon name="general/signal"></nuxt-icon>Статусы</router-link
      >
    </div>
    <div class="menu__item">
      <router-link to="/support"
        ><nuxt-icon name="general/eye"></nuxt-icon>Поддержка</router-link
      >
    </div>
  </div>
</template>



<script setup>
</script>



<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-right: 1px solid $white;
  width: 16%;
  margin-right: 20px;
  padding: 20px 20px;
  height: 96vh;

  .menu__item {
    margin-bottom: 20px;
    &:first-child {
      margin-top: 36px;
    }

    a {
      font-size: 18px;
    }

    .nuxt-icon {
      margin-right: 10px;
    }
  }
}
</style>