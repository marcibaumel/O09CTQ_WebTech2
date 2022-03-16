import { CollectionElementPlatform } from "./collection-element-platform.enum"

export interface CollectionElement{
  id: string,
  title: string,
  platform: CollectionElementPlatform,
  about: string,
  added: Date
}
