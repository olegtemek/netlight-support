export const useAuthStore = defineStore('auth', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      token: null,
      errors: {
        email: null,
        password: null,
        general: null,
      }
    }
  },

  actions: {
    async login(data) {
      this.errors.email = null
      this.errors.password = null
      this.errors.general = null
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/auth/login', {
          body: {
            email: data.email,
            password: data.password
          },
          method: 'POST'
        })

        if (res.status == 200) {
          const token = res.data.token
          this.token = token
          let cookie = useCookie('token')
          cookie.value = token
          return navigateTo('/')
        }

      }
      catch (error) {
        this.errors.general = error.data.data

      }

    },

    async check(data) {
      try {
        let res = await $fetch(useRuntimeConfig().public.api + '/auth/check', {
          method: 'POST',
        })
        if (res.status == 200) {
          this.token = useCookie('token').value
        }
        else {
          useCookie('token').value = null
          return navigateTo('/auth')
        }

      } catch (error) {
        useCookie('token').value = null
        return navigateTo('/auth')
      }
    },
    async logout() {
      try {
        useCookie('token').value = null
        return navigateTo('/auth')
      } catch (error) {
        return navigateTo('/auth')
      }
    }
  }
})