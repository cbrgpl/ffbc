import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { bulkCreateInputCharacteristic } from "@/shared/api/generated/api";
import type { InputCharacteristicCreateDto } from "@/shared/api/generated/model";
import { dto2InputChar } from "../model/input-char";

export const createInputChars = async (inputChars: InputCharacteristicCreateDto[]) => {
  try {
    const res = await bulkCreateInputCharacteristic(inputChars);

    if (res.status === 200) {
      return res.data.map(dto2InputChar);
    }

    throw new UnexpectedResponseError("bulkCreateInputCharacteristic", res);
  } catch (e) {
    throw new ApiError("bulkCreateInputCharacteristic", "Unexpected error while creating input characteristics", {
      cause: e,
    });
  }
};
