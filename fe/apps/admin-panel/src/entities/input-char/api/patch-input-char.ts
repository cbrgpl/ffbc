import { ApiError, UnexpectedResponseError } from "@ffbc/shared";
import { updateInputCharacteristic } from "@/shared/api/generated/api";
import type { InputCharacteristicUpdateDto } from "@/shared/api/generated/model";
import { dto2InputChar } from "../model/input-char";

export const patchInputChar = async (id: number, inputChar: InputCharacteristicUpdateDto) => {
  try {
    const res = await updateInputCharacteristic(id, inputChar);

    if (res.status === 200) {
      return dto2InputChar(res.data);
    }

    throw new UnexpectedResponseError("updateInputCharacteristic", res);
  } catch (e) {
    throw new ApiError("updateInputCharacteristic", "Unexpected error while updating input characteristic", { cause: e });
  }
};
