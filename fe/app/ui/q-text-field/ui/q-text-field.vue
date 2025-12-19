<script lang="ts" setup>
import { QFieldBase, type FieldBaseProps, type FieldBaseSlots } from "~/ui/q-field-base";
import { type DimensionProps, type SizeProps, useSize, useLoading, useUnavailable, useDimension, type UiProps } from "~utils/ui-toolkit";

import { QCarouselLoader } from "~/ui/q-carousel-loader";

defineOptions({
  name: "q-text-field",
});

const $props = withDefaults(
  defineProps<
    {
      filled?: boolean;
      placeholder?: string;
    } & FieldBaseProps &
      DimensionProps &
      SizeProps &
      Omit<UiProps, "color">
  >(),
  {
    size: "xs",
    placeholder: "Type here...",
  },
);

defineSlots<FieldBaseSlots>();

const { sizeClasses } = useSize($props);
const { isLoading } = useLoading($props);
const { isUnavailable } = useUnavailable($props);
const { dimensionStyle } = useDimension($props);
</script>

<template>
  <QFieldBase
    :style="{ ...dimensionStyle }"
    variant="classic"
    :label="$props.label"
    :status="$props.status"
    :error-message="$props.errorMessage"
    :tip="$props.tip"
  >
    <template #label="props">
      <slot
        name="label"
        v-bind="props"
      ></slot>
    </template>
    <template #default="{ fieldId }">
      <div
        :class="[
          'text-field',
          ...sizeClasses,
          {
            'text-field_filled': $props.filled,
            'text-field_error': $props.status === 'error',
            'text-field_success': $props.status === 'success',
            'text-field_warn': $props.status === 'warn',
            'text-field_disabled': $props.disabled,
            'text-field_readonly': $props.readonly,
          },
        ]"
      >
        <input
          :id="fieldId"
          class="text-field__input"
          type="text"
          :placeholder="$props.placeholder"
          :disabled="$props.disabled"
          :readonly="$props.readonly"
        />

        <QCarouselLoader
          class="text-field__loader"
          :size="$props.size"
        />
      </div>
    </template>
  </QFieldBase>
</template>

<style scoped>
.text-field {
  display: flex;
  border: 1ps solid var(--md-sys-color-outline);
  color: var(--md-sys-color-on-surface);
  background-color: var(--md-sys-color-surface);
}

.text-field_disabled {
  border-color: var(--color-disable-outline);
  color: var(--color-disabled-content);
  background-color: var(--color-disabled-container);
}

.text-field__input {
  flex-grow: 1;
  padding: 0;
  border: none;
  background-color: transparent;
}

.text-field__input:focus {
  outline: none;
}

.text-field_filled {
  background-color: var(--md-sys-color-surface-variant);
}

.text-field_error {
  border-color: var(--md-sys-color-error);
}

.text-field_success {
  border-color: var(--md-extended-color-success-color);
}

.text-field_warn {
  border-color: var(--md-extended-color-warn-color);
}

.text-field__loader {
  flex-shrink: 0;
}
</style>
