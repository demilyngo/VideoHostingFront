import { ProfileDto } from './ProfileDto'
import type { TagDto } from './TagDto'

export class VideoDto {
  constructor(options?: Partial<VideoDto>) {
    this.id = options?.id ?? 0
    this.title = options?.title ?? ''
    this.comment = options?.comment ?? ''
    this.creationDate = options?.creationDate ?? new Date()
    this.likesCOunt = options?.likesCOunt ?? 0
    this.path = options?.path ?? ''
    this.creator = options?.creator ?? new ProfileDto()
    this.tags = options?.tags ?? []
  }

  id: number
  title: string
  comment: string
  creationDate: Date
  likesCOunt: number
  path: string
  creator: ProfileDto
  tags: TagDto[]
}
