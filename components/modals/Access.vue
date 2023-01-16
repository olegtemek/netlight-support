
<template>
  <div class="modal__wrapper blur" v-click-outside="closeModal">
    <h2>{{ modalText }} заметку</h2>
    <div class="flex-access">
      <div class="modal__item">
        <h3>Название сайта</h3>
        <textarea v-model="access.site_name"></textarea>
      </div>
      <div class="modal__item">
        <h3>Админка сайта</h3>
        <textarea v-model="access.site_admin"></textarea>
      </div>
      <div class="modal__item">
        <h3>Хостинг сайта</h3>
        <textarea v-model="access.site_host"></textarea>
      </div>
      <div class="modal__item">
        <h3>Фтп сайта</h3>
        <textarea v-model="access.site_ftp"></textarea>
      </div>
    </div>

    <button @click="accessSave">Сохранить</button>
  </div>
</template>



<script setup>
import { useAccessStore } from "@/store/access.js";
const modalText = ref("Добавить");
const props = defineProps({
  accessModal: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const access = ref({
  site_id: null,
  site_name: null,
  site_admin: null,
  site_host: null,
  site_ftp: null,
});
if (props.accessModal) {
  modalText.value = "Изменить";
  access.value.site_id = props.accessModal.site_id;
  access.value.site_name = props.accessModal.site_name;
  access.value.site_admin = props.accessModal.site_admin;
  access.value.site_host = props.accessModal.site_host;
  access.value.site_ftp = props.accessModal.site_ftp;
}
const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const accessStore = useAccessStore();

const accessSave = () => {
  if (!access.value.site_id) {
    accessStore.create(access.value);
  } else {
    accessStore.update(access.value);
  }

  emit("closeModal");
};
</script>

