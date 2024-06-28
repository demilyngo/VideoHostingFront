<template>
  <el-card style="width: 70%; margin: 0 auto">
    <el-container>
      <el-main
        style="border-bottom: 1px solid var(--el-border-color); justify-content: space-around"
      >
        <iframe
          class="mb-3"
          width="420"
          height="350"
          :src="props.video.path"
          style="display: block; margin: 0 auto"
        />
        <div class="flex">
          <div class="flex">
            <el-tag
              class="me-2"
              v-for="tag in props.video.tags"
              :key="tag.id"
              size="large"
              effect="plain"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </div>
      </el-main>
      <el-footer style="height: 100px">
        <div>
          <span style="font-size: 24px">{{ videoName }}</span>
        </div>
        <div>
          <span style="font-size: 20px">{{ user }}</span>
        </div>
        <div>
          <span>{{ comment }}</span>
        </div>
      </el-footer>
    </el-container>
  </el-card>
</template>

<script setup lang="ts">
import { VideoDto } from '@/models/VideoDto'
import { ref } from 'vue'

const props = defineProps({
  video: {
    type: VideoDto,
    required: true
  }
})

const videoName = ref<string>(props.video.title)
const user = ref<string>(props.video.creator.name)
const comment = ref<string>(props.video.comment)
</script>
