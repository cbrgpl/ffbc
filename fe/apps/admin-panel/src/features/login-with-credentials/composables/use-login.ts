import { useSession } from "@/entities/session";
import { ref } from "vue";
import { type LoginCredentials, loginWithCredentials } from "../api/login-with-credentials";

export type { LoginCredentials } from "../api/login-with-credentials";

export const useLogin = () => {
  const loginProcessing = ref(false);
  const { initSession } = useSession();

  const login = async (credentials: LoginCredentials, abort?: AbortSignal) => {
    try {
      loginProcessing.value = true;
      const loggedIn = await loginWithCredentials(credentials, abort);

      if (!loggedIn) {
        return null;
      }

      await initSession();

      return loggedIn;
    } catch (e) {
      throw new Error("Unexpected error caused while loginning in", { cause: e });
    } finally {
      loginProcessing.value = false;
    }
  };

  return { login, loginProcessing };
};
