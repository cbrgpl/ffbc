<script lang="ts" setup>
import { InputCharType } from "../../../model/input-char";

const COLOR_BY_TYPE = {
  [InputCharType.NUMBER]: "primary",
  [InputCharType.MEASURING]: "warning",
  [InputCharType.TEXT]: "neutral",
  [InputCharType.BOOLEAN]: "success",
  [InputCharType.MEDIA]: "info",
} as const satisfies Record<InputCharType, string>;

defineOptions({
  name: "q-input-char-type-badge",
});

const $props = defineProps<{
  type: InputCharType;
}>();
</script>

<template>
  <UBadge
    :label="$props.type"
    :color="COLOR_BY_TYPE[$props.type]"
    variant="soft"
    class="capitalize"
  />
</template>
