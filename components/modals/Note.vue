<template>
  <div class="modal__wrapper blur" v-click-outside="closeModal">
    <h2>{{ modalText }} заметку</h2>
    <div class="modal__item">
      <h3>Заметка</h3>
      <textarea v-model="note.body"></textarea>
    </div>

    <button @click="noteSave">Сохранить</button>
  </div>
</template>



<script setup>
import { useNoteStore } from "@/store/note.js";
const modalText = ref("Добавить");
const props = defineProps({
  noteModal: {
    type: Object,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const note = ref({
  id: null,
  body: null,
});
if (props.noteModal) {
  modalText.value = "Изменить";
  note.value.id = props.noteModal.id;
  note.value.body = props.noteModal.body;
}
const emit = defineEmits(["closeModal"]);
const closeModal = () => {
  emit("closeModal");
};

const noteStore = useNoteStore();

const noteSave = () => {
  if (!note.value.id) {
    noteStore.create(note.value);
  } else {
    noteStore.update(note.value);
  }

  emit("closeModal");
};
</script>