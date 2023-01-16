export const useAlertStore = defineStore('alert', {
  // arrow function recommended for full type inference
  state: () => ({
    text: null,
    error: false
  }),

  actions: {
    async alert(text, hasError = false) {
      this.text = text
      this.error = hasError
      setTimeout(() => {
        this.text = null
        this.error = false
      }, 2000)

    },
  }
})