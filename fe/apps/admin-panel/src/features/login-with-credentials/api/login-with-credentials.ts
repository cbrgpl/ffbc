import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { loginWithCredentials as apiLoginWithCredentials } from "@/shared/api/generated/api";

export type LoginCredentials = { username: string; password: string };

export const loginWithCredentials = async (credentials: LoginCredentials, abort?: AbortSignal) => {
  try {
    const res = await apiLoginWithCredentials(
      {
        email: credentials.username,
        password: credentials.password,
      },
      { signal: abort },
    );

    if (res.status === 200) {
      return true;
    } else if (res.status === 422 || res.status === 401) {
      return false;
    }

    throw new UnexpectedResponseError("loginWithCredentials", res);
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw e;
    }

    throw new ApiError("loginWithCredentials", "Unexpected error while logging in as admin", { cause: e });
  }
};
