export class TagDto {
  constructor(options: TagDto) {
    this.id = options.id ?? 0
    this.name = options.name ?? ''
  }

  id: number
  name: string
}
