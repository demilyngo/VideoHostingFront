<template>
  <div>
    <el-container>
      <el-header class="p-0">
        <HeaderComponent :is-need-login="isNeedLogin" @closeLogin="closeLogin" />
      </el-header>
      <el-container style="height: 850px">
        <el-aside width="20em" style="border: 1px solid var(--el-border-color)">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="loadBestVideos">
              <template #title>
                <el-icon><TrophyBase /></el-icon>
                <span>Лучшее</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><View /></el-icon>
              <span>Новое</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><VideoPlay /></el-icon>
              <span>Рекомендации</span>
            </el-menu-item>
            <el-menu-item index="4" @click="loadLikedVideos">
              <el-icon><Star /></el-icon>
              <span>Понравившееся</span>
            </el-menu-item>
            <el-menu-item index="5" @click="loadSavedVideos">
              <el-icon><Collection /></el-icon>
              <span>Сохраненное</span>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon><Film /></el-icon>
              <span>Мои видео</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main v-loading="isDataLoading" style="border: 1px solid var(--el-border-color)">
          <div v-for="video in videos" :key="video.id" style="overflow: auto">
            <VideoComponent
              v-if="video.tags.some((x) => checkedTags.includes(x.id)) || checkedTags.length == 0"
              :video="video"
              style="margin-bottom: 30px"
            />
          </div>
        </el-main>
        <el-aside width="25em" style="border: 1px solid var(--el-border-color)">
          <el-check-tag
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            class="ms-2 mt-2"
            type="success"
            size="large"
            v-model="checkedTags"
            :checked="checkedTags.includes(category.id)"
            @change="toggleTag(category.id)"
            round
            >{{ category.name }}</el-check-tag
          >
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { VideoPlay } from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css'
import { ref, onMounted } from 'vue'
import VideoComponent from '@/components/VideoComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { TagDto } from '@/models/TagDto'
import { getAllTags } from '@/services/TagService'
import { getAllVideos, getLikedVideos, getSavedVideos } from '@/services/VideoService'
import type { VideoDto } from './models/VideoDto'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const categories = ref<TagDto[]>([])

const isDataLoading = ref(false)

const checkedTags = ref<number[]>([])

const toggleTag = (tagId: number) => {
  checkedTags.value.includes(tagId)
    ? checkedTags.value.splice(checkedTags.value.indexOf(tagId), 1)
    : checkedTags.value.push(tagId)
}

const isNeedLogin = ref<boolean>(false)
const videos = ref<VideoDto[]>([])
const loadBestVideos = async () => {
  videos.value = await getAllVideos()
}

const loadLikedVideos = async () => {
  if (!authStore.user) {
    isNeedLogin.value = true
  } else {
    videos.value = await getLikedVideos()
  }
}

const loadSavedVideos = async () => {
  if (!authStore.user) {
    isNeedLogin.value = true
  } else {
    videos.value = await getSavedVideos()
  }
}

const closeLogin = () => {
  isNeedLogin.value = false
}

onMounted(async () => {
  categories.value = await getAllTags()
  videos.value = await getAllVideos()
})
</script>

<style scoped>
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
