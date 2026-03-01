<script lang="ts" setup>
import { computed, toValue } from "vue";

import type { SizeProps } from "~uikit/libs/standard";
import { QButton } from "~uikit/ui/q-button";
import type { ButtonBaseProps } from "~uikit/ui/q-button-base";

import type { ConnectedButtonGroupSeg } from "../types";

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
