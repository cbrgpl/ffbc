import { setupWorker } from "msw/browser";
import { getFFBCAdminPanelAPIMock } from "./../generated/api";
import { manualHandlers } from "./manual-handlers";
export const worker = setupWorker(...manualHandlers, ...getFFBCAdminPanelAPIMock());
