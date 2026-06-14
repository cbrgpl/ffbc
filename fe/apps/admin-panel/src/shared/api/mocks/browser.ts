import { setupWorker } from "msw/browser";
import { getFFBCAdminPanelAPIMock } from "./../generated/api";
import { manualHandlers } from "./manual-handlers";

const ignoredHandlers = [
  { method: "POST", path: "*/admin/auth/login" },
  { method: "POST", path: "*/admin/auth/logout" },
  { method: "GET", path: "*/admin/user/me" },
] as const;

const isIgnoredHandler = (handler: ReturnType<typeof getFFBCAdminPanelAPIMock>[number]) => {
  return ignoredHandlers.some(({ method, path }) => handler.info.method === method && handler.info.path === path);
};

const generatedHandlers = getFFBCAdminPanelAPIMock().filter((handler) => !isIgnoredHandler(handler));

export const worker = setupWorker(...manualHandlers, ...generatedHandlers);
