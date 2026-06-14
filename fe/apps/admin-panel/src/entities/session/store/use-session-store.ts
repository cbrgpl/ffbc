import { defineStore } from "pinia";
import { type Session } from "../model/session";
import { readonly, ref, watch } from "vue";
import { registerCleanupableStore, type CleanupContract } from "../utils/stores-cleanup";

const WAIT_SESSION_TIMEOUT = 10_000;
const SESSION_TIMEOUT_ERROR = new Error("Session awaitness is out of timeout");

export const useSessionStore = defineStore("session", () => {
  const session = ref<Session | null>(null);
  const sessionLoad = ref<null | boolean>(null);

  const setSession = (value: Session | null) => {
    session.value = value;
    sessionLoad.value = value ? true : false;
  };

  const cleanup = () => {
    setSession(null);
  };

  const waitSessionLoad = async () => {
    return new Promise<void>((resolve, reject) => {
      let timeoutId = null as number | null;

      const unwatch = watch(
        () => sessionLoad.value,
        (sessionLoad) => {
          if (typeof sessionLoad === "boolean") {
            resolve();

            if (timeoutId) {
              window.clearTimeout(timeoutId);
            }
          }
        },
        { immediate: true },
      );

      timeoutId = window.setTimeout(() => {
        unwatch();
        reject(SESSION_TIMEOUT_ERROR);
      }, WAIT_SESSION_TIMEOUT);
    });
  };

  const cleanupContract: CleanupContract = {
    cleanup,
  };

  return {
    session: readonly(session),
    sessionLoad: readonly(sessionLoad),
    setSession,
    waitSessionLoad,
    ...cleanupContract,
  };
});
