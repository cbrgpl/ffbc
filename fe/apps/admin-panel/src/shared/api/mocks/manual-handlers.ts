import { http, HttpResponse, passthrough } from "msw";

export const manualHandlers = [
  http.get("/health", () => {
    return HttpResponse.json({ status: "ok" });
  }),

  http.post("/file-storage/file", () => {
    return passthrough();
  }),
];
