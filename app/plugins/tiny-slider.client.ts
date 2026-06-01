import { defineNuxtPlugin } from '#app'
import { tns } from 'tiny-slider/src/tiny-slider'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tns
    }
  }
})