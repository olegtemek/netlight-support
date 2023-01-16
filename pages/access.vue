<template>
  <div class="access">
    <div class="access__top">
      <button @click="openModal" class="create">Добавить доступ</button>
      <span v-if="!openedSearch" @click="openSearch"
        ><nuxt-icon name="general/search"></nuxt-icon
      ></span>
      <transition name="foobar">
        <input
          type="text"
          v-if="openedSearch"
          v-model="searchedText"
          placeholder="Поиск по названию сайта"
          @keyup="findDomain()"
        />
      </transition>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Название сайта</th>
          <th>Админка сайта</th>
          <th>Хостинг сайта</th>
          <th>Фтп сайта</th>
          <th>Изменить/Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="access of accessStore.getAll" :key="access.id">
          <td style="width: 25%">
            {{ access.site_name }}
          </td>
          <td style="width: 25%">
            {{ access.site_admin }}
          </td>
          <td style="width: 25%">
            {{ access.site_host }}
          </td>
          <td style="width: 25%">
            {{ access.site_ftp }}
          </td>
          <td style="width: 25%">
            <div class="tools">
              <button class="edit" @click="openModal(access)">
                <nuxt-icon name="general/edit"></nuxt-icon>
              </button>
              <button class="delete" @click="destroyAccess(access.site_id)">
                <nuxt-icon name="general/trash"></nuxt-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" :class="modalActive ? 'active' : ''">
      <ModalsAccess
        v-if="modalActive"
        :accessModal="accessModal"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>



<script setup>
import { useAccessStore } from "@/store/access.js";
const modalActive = ref(false);
const openModal = (access) => {
  modalActive.value = !modalActive.value;
  if (access.site_id) {
    accessModal.value = access;
  }
};
const accessModal = ref(null);

const destroyAccess = (site_id) => {
  accessStore.destroy(site_id);
};

const accessStore = useAccessStore();
await accessStore.fetchAll();

const closeModal = () => {
  modalActive.value = false;
  accessModal.value = null;
};

const openedSearch = ref(false);
const searchedText = ref(null);
const openSearch = () => {
  openedSearch.value = true;
};

const findDomain = async () => {
  await accessStore.findDomain(searchedText.value);
};
</script>


