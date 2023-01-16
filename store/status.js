import { useAlertStore } from "@/store/alert.js";
export const useStatusStore = defineStore('status', {
  // arrow function recommended for full type inference
  state: () => ({
    statuses: null,
    loading: null
  }),

  actions: {
    async create(status) {
      try {


        const res = await $fetch(useRuntimeConfig().public.api + '/status/create', {
          body: {
            status: status
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

    async update(status) {
      try {

        const res = await $fetch(useRuntimeConfig().public.api + '/status/update', {
          body: {
            status: status
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
      this.loading = true;
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/status')
        if (res.status == 200) {
          this.statuses = res.data.data
          this.loading = false
        }

      } catch (e) {
        console.log(e);
      }
    },
    async destroy(id) {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/status/destroy', {
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
      return state.statuses
    }
  }
})