import { UNEXPECTED_ERR_MESSAGE } from "@/shared/static";
import { userMe } from "../api/user-me";
import { useSessionStore } from "../store/use-session-store";
import { logout } from "../api/logout";
import { cleanupStores } from "../utils/stores-cleanup";

export const useSession = () => {
  const sessionStore = useSessionStore();
  const toast = useToast();

  const abortSession = async () => {
    try {
      await logout();
      cleanupStores();
    } catch (e) {
      console.error(e);
      // mostly current page state is broken, so reset it
      window.location.reload();
    }
  };

  const initSession = async () => {
    try {
      const user = await userMe();
      sessionStore.setSession(user);
    } catch (e) {
      toast.add({
        title: "Failed to init session",
        description: `${e instanceof Error ? e.message : UNEXPECTED_ERR_MESSAGE}`,
      });

      sessionStore.setSession(null);

      console.error(e);
    }
  };

  return { abortSession, initSession };
};
