import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { logout as apiLogout } from "@/shared/api/generated/api";

export const logout = async () => {
  try {
    const res = await apiLogout();

    if (res.status === 204 || res.status === 401) {
      return true;
    }

    throw new UnexpectedResponseError("logout", res);
  } catch (e) {
    throw new ApiError("logout", "Unexpected error while logouting as admin", { cause: e });
  }
};
