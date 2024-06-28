import { defineStore } from 'pinia'

import axios from 'axios'
import { UserDto } from '@/models/UserDto'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')!),
    token: localStorage.getItem('token')
  }),
  actions: {
    async login(login: string, password: string): Promise<UserDto> {
      const { data } = await axios
        .post<{ token: string; user: UserDto }>(`/api/login`, {
          login: login,
          password: password
        })
        .catch((error) => {
          throw error
        })

      this.user = data.user
      this.token = data.token

      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)

      return this.user
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return new UserDto()
    }
  }
})
