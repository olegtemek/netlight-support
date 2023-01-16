<template>
  <div class="status" v-if="!statusStore.loading">
    <button @click="openModal" class="create">Добавить сайт</button>
    <table class="table">
      <thead>
        <tr>
          <th>Домен</th>
          <th>Статус</th>
          <th>Изменить/Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status of statusStore.getAll" :key="status.id">
          <td style="width: 45%">
            {{ status.domain }}
          </td>
          <td style="width: 45%">
            <p style="color: red" v-if="status.code == 500">Не работает</p>
            <p v-else style="color: #66ff99">Работает</p>
          </td>
          <td style="width: 25%">
            <div class="tools">
              <button class="edit" @click="openModal(status)">
                <nuxt-icon name="general/edit"></nuxt-icon>
              </button>
              <button class="delete" @click="destroyStatus(status.id)">
                <nuxt-icon name="general/trash"></nuxt-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" :class="modalActive ? 'active' : ''">
      <ModalsStatus
        v-if="modalActive"
        :statusModal="statusModal"
        @closeModal="closeModal"
      />
    </div>
  </div>
  <div class="loading" v-else>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>



<script setup>
import { useStatusStore } from "@/store/status.js";
const modalActive = ref(false);
const openModal = (status) => {
  modalActive.value = !modalActive.value;
  if (status.id) {
    statusModal.value = status;
  }
};
const statusModal = ref(null);

const destroyStatus = (id) => {
  statusStore.destroy(id);
};

const statusStore = useStatusStore();
await statusStore.fetchAll();

const closeModal = () => {
  modalActive.value = false;
  statusModal.value = null;
};
</script>