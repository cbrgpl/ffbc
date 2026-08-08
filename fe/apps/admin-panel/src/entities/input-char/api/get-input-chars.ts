import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { getInputCharacteristics } from "@/shared/api/generated/api";
import type { PaginationModel } from "@/shared/ui/q-pagination";
import { dto2InputChar } from "../model/input-char";

export type GetInputCharsParams = {
  signal: AbortSignal;
  pagination: PaginationModel;
  search: string;
};

export const getInputChars = async ({ signal, pagination, search }: GetInputCharsParams) => {
  try {
    const res = await getInputCharacteristics(
      {
        search,
        offset: (pagination.page - 1) * pagination.perPage,
        count: pagination.perPage,
      },
      { signal },
    );

    if (res.status === 200) {
      return { items: res.data.map(dto2InputChar), total: 10020 };
    } else if (res.status === 204) {
      return { items: [], total: 0 };
    }

    throw new UnexpectedResponseError("getInputCharacteristics", res);
  } catch (e) {
    if (signal.aborted) {
      throw signal.reason;
    }

    throw new ApiError("getInputCharacteristics", "Unexpected error while fetching input characteristics", { cause: e });
  }
};
