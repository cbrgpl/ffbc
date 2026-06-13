import { useSessionStore, type Session } from "@/entities/session";
import { ref } from "vue";

import { loginWithCredentials } from "@/shared/api/generated/api";

export type LoginCredentials = { login: string; password: string };

export const useLogin = () => {
  const loginProcessing = ref(false);

  const login = async (credentials: LoginCredentials, abort?: AbortSignal) => {
    try {
      loginProcessing.value = true;

      const response = await loginWithCredentials(
        {
          email: credentials.login,
          password: credentials.password,
        },
        { signal: abort },
      );

      if (response.status === 200) {
        return true;
      } else if (response.status === 401) {
        return false;
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return null;
      }

      throw e;
    } finally {
      loginProcessing.value = false;
    }
  };

  return { login, loginProcessing };
};
