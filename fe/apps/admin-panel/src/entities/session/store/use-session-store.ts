import { defineStore } from "pinia";
import { type Session } from "../model/session";
import { ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  const session = ref<Session | null>(null);

  return {
    session,
  };
});
