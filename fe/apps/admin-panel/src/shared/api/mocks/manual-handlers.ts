import { delay, http, HttpResponse, passthrough } from "msw";

const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 5000;

const randomDelay = () => MIN_DELAY_MS + (MAX_DELAY_MS - MIN_DELAY_MS) * Math.random();

export const manualHandlers = [
  // http.post("*/auth/login-with-credentials", async () => {
  //   await delay(randomDelay());

  //   return new HttpResponse(null, { status: 421 });
  // }),

  http.get("/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),

  http.post("/file-storage/file", () => {
    return passthrough();
  }),
];
