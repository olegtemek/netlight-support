
<template>
  <div class="modal__wrapper blur" v-click-outside="closeModal">
    <h2>{{ modalText }} клиента</h2>
    <div class="flex-access">
      <div class="modal__item">
        <h3>Название сайта</h3>
        <input type="text" v-model="support.domain" />
      </div>
      <div class="modal__item">
        <h3>Имя</h3>
        <input type="text" v-model="support.name" />
      </div>
      <div class="modal__item">
        <h3>Номер телефона</h3>
        <input
          type="text"
          v-maska
          data-maska="+7(###)-###-##-##"
          v-model="support.number"
        />
      </div>
      <div class="modal__item">
        <h3>До какого</h3>
        <input type="date" v-model="support.date" />
      </div>
      <div class="modal__item">
        <h3>Кол-во обращений</h3>
        <input type="text" v-model.number="support.count" />
      </div>
    </div>

    <button @click="supportSave">Сохранить</button>
  </div>
</template>



<script setup>
import { useSupportStore } from "@/store/support.js";
const modalText = ref("Добавить");
const props = defineProps({
  supportModal: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const support = ref({
  id: null,
  domain: null,
  name: null,
  number: null,
  date: null,
  count: null,
});
if (props.supportModal) {
  modalText.value = "Изменить";
  support.value.id = props.supportModal.id;
  support.value.domain = props.supportModal.domain;
  support.value.name = props.supportModal.name;
  support.value.number = props.supportModal.number;
  support.value.date = props.supportModal.date;
  support.value.count = props.supportModal.count;
}
const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const supportStore = useSupportStore();

const supportSave = () => {
  if (!support.value.id) {
    supportStore.create(support.value);
  } else {
    supportStore.update(support.value);
  }

  emit("closeModal");
};
</script>

