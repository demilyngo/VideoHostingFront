import { ProfileDto } from './ProfileDto'

export class UserDto {
  constructor(options?: Partial<UserDto>) {
    this.id = options?.id ?? 0
    this.email = options?.email ?? ''
    this.login = options?.login ?? ''
    this.password = options?.password ?? ''
    this.profile = options?.profile ?? new ProfileDto()
  }

  id: number
  email: string
  login: string
  password: string
  profile: ProfileDto
}
