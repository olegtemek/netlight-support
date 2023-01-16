import { useAlertStore } from "@/store/alert.js";
export const useNoteStore = defineStore('note', {
  // arrow function recommended for full type inference
  state: () => ({
    notes: null
  }),

  actions: {
    async create(note) {
      try {


        const res = await $fetch(useRuntimeConfig().public.api + '/note/create', {
          body: {
            note: note
          },
          method: 'POST'
        })

        if (res.status == 200) {
          this.fetchAll()
          useAlertStore().alert('Успешно добавлен')
        }

      } catch (e) {
        console.log(e);
      }

    },

    async update(note) {
      try {

        const res = await $fetch(useRuntimeConfig().public.api + '/note/update', {
          body: {
            note: note
          },
          method: 'POST'
        })

        if (res.status == 200) {
          this.fetchAll()
          useAlertStore().alert('Успешно изменен')
        }

      } catch (e) {
        console.log(e);
      }

    },

    async fetchAll() {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/note')

        if (res.status == 200) {
          this.notes = res.data.data
        }

      } catch (e) {
        console.log(e);
      }
    },
    async destroy(id) {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/note/destroy', {
          method: "POST",
          body: {
            id: id
          }
        })
        if (res.status == 200) {
          this.fetchAll()
          useAlertStore().alert('Успешно удален')
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    getAll(state) {
      return state.notes
    }
  }
})