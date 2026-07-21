import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { getAdminUserMe } from "@/shared/api/generated/api";
import { dto2Session } from "./../model/session";

export const userMe = async () => {
  try {
    const res = await getAdminUserMe();

    if (res.status === 200) {
      return dto2Session(res.data);
    } else if (res.status === 401) {
      return null;
    }

    throw new UnexpectedResponseError("getAdminUserMe", res);
  } catch (e) {
    throw new ApiError("getAdminUserMe", "Unexpected error while fetching admin session data", { cause: e });
  }
};
