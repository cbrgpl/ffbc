import { setupServer } from "msw/node";
import { getFFBCAdminPanelAPIMock } from "./../generated/api";
import { manualHandlers } from "./manual-handlers";

export const server = setupServer(...manualHandlers, ...getFFBCAdminPanelAPIMock());
