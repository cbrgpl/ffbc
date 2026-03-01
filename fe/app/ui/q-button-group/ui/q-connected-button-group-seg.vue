<script lang="ts" setup>
import type { SizeProps } from "~/utils/ui-toolkit";
import type { ConnectedButtonGroupSeg } from "../types";
import { QButton } from "~/ui/q-button";
import type { ButtonBaseProps } from "~/ui/q-button-base";

defineOptions({
  name: "q-connected-button-group-seg",
});

const props = defineProps<
  {
    seg: ConnectedButtonGroupSeg;
    disabled: boolean;
  } & SizeProps &
    Pick<ButtonBaseProps, "form">
>();

const modelValue = defineModel<boolean>();

const segIsDisabled = computed(() => toValue(props.seg.disabled));

const icon = computed(() => {
  if (modelValue.value && props.seg.icon) {
    return props.seg.selectedIcon ?? props.seg.icon;
  }

  return props.seg.icon;
});
</script>

<template>
  <QButton
    v-model:selected="modelValue"
    variant="tonal"
    toggle
    :text="props.seg.text"
    :icon="icon"
    :form="props.form"
    :disabled="props.disabled || segIsDisabled"
    @click="modelValue = true"
  />
</template>
