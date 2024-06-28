import { TagDto } from '@/models/TagDto'
import axios from 'axios'

export const getAllTags = async (): Promise<TagDto[]> => {
  const { data } = await axios.get<TagDto[]>('/api/getAllTags')
  return data.map((x) => new TagDto(x))
}
