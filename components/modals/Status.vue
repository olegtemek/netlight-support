
<template>
  <div class="modal__wrapper blur" v-click-outside="closeModal">
    <h2>{{ modalText }} статус</h2>
    <div class="modal__item">
      <h3>Домен сайта</h3>
      <input type="text" v-model="status.domain" />
    </div>

    <button @click="statusSave">Сохранить</button>
  </div>
</template>



<script setup>
import { useStatusStore } from "@/store/status.js";
const modalText = ref("Добавить");
const props = defineProps({
  statusModal: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const status = ref({
  id: null,
  domain: null,
});
if (props.statusModal) {
  modalText.value = "Изменить";
  status.value.id = props.statusModal.id;
  status.value.domain = props.statusModal.domain;
}
const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const statusStore = useStatusStore();

const statusSave = () => {
  if (!status.value.id) {
    statusStore.create(status.value);
  } else {
    statusStore.update(status.value);
  }

  emit("closeModal");
};
</script>

