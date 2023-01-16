import { useAuthStore } from "@/store/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.meta.layout != 'empty') {
    const token = useCookie('token')
    const loginStore = useAuthStore()
    if (!token.value) {
      if (process.client) return window.location.href = "/auth";
    }

    if (process.client) loginStore.check();
  } else {
    const token = useCookie('token')
    if (token.value) {
      if (process.client) return window.location.href = "/";
    }
  }
})