export class ProfileDto {
  constructor(options?: Partial<ProfileDto>) {
    this.id = options?.id ?? 0
    this.name = options?.name ?? ''
  }

  id: number
  name: string
}
