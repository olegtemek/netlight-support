import { useAlertStore } from "@/store/alert.js";
export const useSupportStore = defineStore('support', {
  // arrow function recommended for full type inference
  state: () => ({
    support: null
  }),

  actions: {
    async create(support) {
      try {


        const res = await $fetch(useRuntimeConfig().public.api + '/support/create', {
          body: {
            support: support
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

    async update(support) {
      try {

        const res = await $fetch(useRuntimeConfig().public.api + '/support/update', {
          body: {
            support: support
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
        let res = await $fetch(useRuntimeConfig().public.api + '/support')

        if (res.status == 200) {
          this.support = res.data.data
        }

      } catch (e) {
        console.log(e);
      }
    },
    async destroy(id) {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/support/destroy', {
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
    },

    async editCount(id, count) {
      if (count < 0) {
        this.fetchAll()
        return useAlertStore().alert('Нельзя ставить меньше нуля', true)
      }
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/support-count/', {
          method: "POST",
          body: {
            id: id,
            count: count
          }
        })
        this.fetchAll()
        useAlertStore().alert('Успешно изменен')
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getAll(state) {
      return state.support
    }
  }
})