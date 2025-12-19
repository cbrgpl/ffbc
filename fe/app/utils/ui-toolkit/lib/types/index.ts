/** Makes every T[Key] as Ref<T[Key]> */
export type _Refify<T extends object, Excluded = void> = {
  [Key in keyof T]: Ref<Exclude<T[Key], Excluded>>
}

