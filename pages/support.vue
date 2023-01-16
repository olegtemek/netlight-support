<template>
  <div class="access">
    <button @click="openModal" class="create">Добавить клиента</button>

    <table class="table">
      <thead>
        <tr>
          <th>Название сайта</th>
          <th>Имя клиента</th>
          <th>Номер клиента</th>
          <th>Поддержка до:</th>
          <th>Кол-во обращений</th>
          <th>Изменить/Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="support of supportStore.getAll" :key="support.id">
          <td style="width: 20%">
            {{ support.domain }}
          </td>
          <td style="width: 20%">
            {{ support.name }}
          </td>
          <td style="width: 20%">
            {{ support.number }}
          </td>
          <td style="width: 20%">
            {{ support.date }}
          </td>
          <td style="width: 20%">
            <div class="count">
              <button
                class="blur"
                @click="editCount(support.id, support.count, false)"
              >
                -
              </button>
              <input
                type="text"
                v-model.number="support.count"
                @change="editCount(support.id, support.count)"
              />
              <button
                class="blur"
                @click="editCount(support.id, support.count, true)"
              >
                +
              </button>
            </div>
          </td>
          <td style="width: 25%">
            <div class="tools">
              <button class="edit" @click="openModal(support)">
                <nuxt-icon name="general/edit"></nuxt-icon>
              </button>
              <button class="delete" @click="destroySupport(support.id)">
                <nuxt-icon name="general/trash"></nuxt-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" :class="modalActive ? 'active' : ''">
      <ModalsSupport
        v-if="modalActive"
        :supportModal="supportModal"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>



<script setup>
import { useSupportStore } from "@/store/support.js";
const modalActive = ref(false);
const openModal = (support) => {
  modalActive.value = !modalActive.value;
  if (support.id) {
    supportModal.value = support;
  }
};
const supportModal = ref(null);

const destroySupport = (id) => {
  supportStore.destroy(id);
};

const supportStore = useSupportStore();
await supportStore.fetchAll();

const closeModal = () => {
  modalActive.value = false;
  supportModal.value = null;
};

const counts = ref([]);

const editCount = (id, count, action) => {
  let newCount = count;
  if (typeof action == "boolean") {
    if (action) {
      newCount++;
    } else {
      newCount--;
    }
  }
  supportStore.editCount(id, newCount);
};
</script>