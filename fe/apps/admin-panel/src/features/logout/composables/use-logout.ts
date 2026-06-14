import { useSessionStore } from "@/entities/session";
import { ref } from "vue";
import { logout as logoutApi } from "@/entities/session/api/logout";

import { cleanupStores } from "@/entities/session/utils/stores-cleanup";

export const useLogout = () => {
  const logoutProcessing = ref(false);

  const logout = async () => {
    try {
      logoutProcessing.value = true;

      await logoutApi();

      return true;
    } catch (e) {
      console.error(e);

      return false;
    } finally {
      cleanupStores();
      logoutProcessing.value = false;
    }
  };

  return { logout, logoutProcessing };
};
