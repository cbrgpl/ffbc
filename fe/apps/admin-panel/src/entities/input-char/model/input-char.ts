import type { InputCharacteristicDto } from "@/shared/api/generated/model";

export enum InputCharType {
  NUMBER = "number",
  MEASURING = "measuring",
  TEXT = "text",
  BOOLEAN = "boolean",
  MEDIA = "media",
}

export type InputChar = {
  id: number;
  name: string;
  type: InputCharType;
};

export const dto2InputChar = (dto: InputCharacteristicDto): InputChar => ({
  id: dto.id,
  name: dto.name,
  type: dto.type as InputCharType,
});
