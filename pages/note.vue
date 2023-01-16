<template>
  <div class="note" ref="noteWrapp">
    <button @click="openModal" class="create">Добавить заметку</button>

    <table class="table">
      <thead>
        <tr>
          <th>Заметка</th>
          <th>Копировать/Изменить/Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note of noteStore.getAll" :key="note.id">
          <td style="width: 81%">
            <p>
              {{ note.body }}
            </p>
          </td>
          <td>
            <div class="tools">
              <button class="copy" @click="copy(note.body)">
                <nuxt-icon name="general/copy"></nuxt-icon>
              </button>
              <button class="edit" @click="openModal(note)">
                <nuxt-icon name="general/edit"></nuxt-icon>
              </button>
              <button class="delete" @click="destroyNote(note.id)">
                <nuxt-icon name="general/trash"></nuxt-icon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" :class="modalActive ? 'active' : ''">
      <ModalsNote
        v-if="modalActive"
        :noteModal="noteModal"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>


<script setup>
import { useNoteStore } from "@/store/note.js";
import { useAlertStore } from "@/store/alert.js";

const modalActive = ref(false);
const openModal = (note) => {
  modalActive.value = !modalActive.value;
  if (note.id) {
    noteModal.value = note;
  }
};
const noteModal = ref(null);

const destroyNote = (id) => {
  noteStore.destroy(id);
};

const noteStore = useNoteStore();
const noteWrapp = ref(null);
await noteStore.fetchAll();

const copy = (text) => {
  const alert = useAlertStore();
  const storage = document.createElement("textarea");
  storage.value = text;

  noteWrapp.value.appendChild(storage);
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  noteWrapp.value.removeChild(storage);
  alert.alert("Успешно скопирована");
};

const closeModal = () => {
  modalActive.value = false;
  noteModal.value = null;
};
</script>