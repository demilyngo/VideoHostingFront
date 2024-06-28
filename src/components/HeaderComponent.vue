<template>
  <div
    style="display: flex; justify-content: space-around; align-items: center; width: 100%"
    class="pt-2 pb-2"
  >
    <el-button type="primary" size="large" @click="testQuery">
      <el-icon class="me-1">
        <Plus />
      </el-icon>
      <span> Создать </span>
    </el-button>

    <el-input v-model="searchInput" :prefix-icon="Search" style="width: 30em; height: 35px" />
    <div v-if="!authStore.user">
      <el-button type="primary" size="large" @click="registerFormVisible = true">
        Регистрация
      </el-button>
      <el-button size="large" @click="loginFormVisible = true">Логин</el-button>
    </div>
    <div v-else style="display: flex; align-items: center">
      <div class="me-5">
        {{ authStore.user.profile.name }}
      </div>
      <div>
        <el-button size="large" @click="authStore.logout()"> Выйти </el-button>
      </div>
    </div>

    <el-dialog v-model="loginFormVisible" title="Логин" width="30%" center @closed="clearLoginForm">
      <el-form :model="login">
        <el-form-item label="Логин" label-width="70px">
          <el-input v-model="login.login" />
        </el-form-item>
        <el-form-item label="Пароль" label-width="70px">
          <el-input v-model="login.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button type="primary" :disabled="isLoginDisabled" @click="loginAction"
            >Войти</el-button
          >
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="registerFormVisible"
      title="Регистрация"
      width="40%"
      center
      @closed="clearRegisterForm"
    >
      <el-form :model="login">
        <el-form-item label="Имя пользователя" label-width="140px">
          <el-input v-model="registerForm.nickname" />
        </el-form-item>
        <el-form-item label="Почта" label-width="140px">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item label="Логин" label-width="140px">
          <el-input v-model="registerForm.login" />
        </el-form-item>
        <el-form-item label="Пароль" label-width="140px">
          <el-input v-model="registerForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="Повторите пароль" label-width="140px">
          <el-input v-model="registerForm.repeatPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button type="primary" :disabled="isRegisterDisabled" @click="register"
            >Зарегистрироваться</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, defineEmits, defineProps, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { registerUser } from '@/services/UserService'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const emits = defineEmits(['closeLogin'])

const props = defineProps({
  isNeedLogin: {
    type: Boolean
  }
})

watch(props, () => {
  loginFormVisible.value = props.isNeedLogin
})

const testQuery = async () => {
  const cats = await axios.post('/api/posts', { title: 'title', text: 'text' })
  console.log(cats)
}

const register = async () => {
  try {
    await registerUser(
      registerForm.nickname,
      registerForm.email,
      registerForm.login,
      registerForm.password
    )
  } catch (error: any) {
    ElMessage.error(error.response.data.error)
  }
}
const loginAction = async () => {
  try {
    await authStore.login(login.login, login.password)
  } catch (error: any) {
    ElMessage.error(error.response.data.error)
    return
  }
  loginFormVisible.value = false
}

const searchInput = ref('')

const registerFormVisible = ref(false)

const loginFormVisible = ref(false)

const isRegisterDisabled = computed(() => {
  return (
    registerForm.nickname == '' ||
    registerForm.email == '' ||
    registerForm.login == '' ||
    registerForm.password == '' ||
    registerForm.repeatPassword == '' ||
    registerForm.password != registerForm.repeatPassword
  )
})

const isLoginDisabled = computed(() => {
  return login.login == '' || login.password == ''
})

const login = reactive({
  login: '',
  password: ''
})
const registerForm = reactive({
  nickname: '',
  email: '',
  login: '',
  password: '',
  repeatPassword: ''
})
const clearLoginForm = () => {
  login.login = ''
  login.password = ''
  emits('closeLogin')
}
const clearRegisterForm = () => {
  registerForm.nickname = ''
  registerForm.email = ''
  registerForm.login = ''
  registerForm.password = ''
  registerForm.repeatPassword = ''
}
</script>
<style></style>
