import { useAlertStore } from "@/store/alert.js";
export const useAccessStore = defineStore('access', {
  // arrow function recommended for full type inference
  state: () => ({
    access: null,
    filterText: null
  }),

  actions: {
    async create(access) {
      try {


        const res = await $fetch(useRuntimeConfig().public.api + '/access/create', {
          body: {
            access: access
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

    async update(access) {
      try {

        const res = await $fetch(useRuntimeConfig().public.api + '/access/update', {
          body: {
            access: access
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
        let res = await $fetch(useRuntimeConfig().public.api + '/access')

        if (res.status == 200) {
          this.access = res.data.data
        }

      } catch (e) {
        console.log(e);
      }
    },
    async destroy(site_id) {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/access/destroy', {
          method: "POST",
          body: {
            site_id: site_id
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

    findDomain(text) {
      if (text != '') {
        this.filterText = text
      } else {
        this.filterText = null;
      }
    }
  },
  getters: {
    getAll(state) {
      if (state.filterText) {
        return state.access.filter(item => item.site_name.indexOf(state.filterText) !== -1)
      }
      return state.access
    },
  }
})