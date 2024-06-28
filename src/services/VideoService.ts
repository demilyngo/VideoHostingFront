import { VideoDto } from '@/models/VideoDto'
import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'

export const getAllVideos = async (): Promise<VideoDto[]> => {
  const { data } = await axios.get<VideoDto[]>(`/api/getAllVideos`)
  return data.map((x) => new VideoDto(x))
}

export const getLikedVideos = async (): Promise<VideoDto[]> => {
  const authStore = useAuthStore()
  const { data } = await axios.get<VideoDto[]>(`/api/getLikedVideos`, {
    headers: {
      Authorization: authStore.token
    }
  })
  return data.map((x) => new VideoDto(x))
}

export const getSavedVideos = async (): Promise<VideoDto[]> => {
  const authStore = useAuthStore()
  const { data } = await axios.get<VideoDto[]>(`/api/getSavedVideos`, {
    headers: {
      Authorization: authStore.token
    }
  })
  return data.map((x) => new VideoDto(x))
}
