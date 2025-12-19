<script lang="ts" setup>
import { QFieldBase, type FieldBaseProps, type FieldBaseSlots } from '~/ui/q-field-base';
import { type DimensionProps, type SizeProps, type UnavailableProps, type ColorProps, useSize } from '~utils/ui-toolkit'

defineOptions({
  name: 'QTextField'
})

const $props = withDefaults(defineProps<{
  filled?: boolean;
  placeholder?: string;
} & FieldBaseProps & DimensionProps & SizeProps & UnavailableProps & Pick<ColorProps, 'theme'>>(), {
  
})
defineSlots<FieldBaseSlots>()

const { sizeClasses } = useSize($props)

</script>

<template>
  <QFieldBase
    variant="classic"
    :label="$props.label" 
    :status="$props.status" 
    :error-message="$props.errorMessage" 
    :tip="$props.tip" >
    <template #label="props">
      <slot name="label" v-bind="props" />
    </template>
    <template #default="{ fieldId }">
      <input
        :class="[
        'text-field',
        ...sizeClasses,
        {
          'text-field__filled': $props.filled,
          'text-field__error': $props.status === 'error',
          'text-field__success': $props.status === 'success',
          'text-field__warn': $props.status === 'warn'
        }
      ]"
        :id="fieldId"
        type="text"
        :placeholder="$props.placeholder"
      />
    </template>
  </QFieldBase>
</template>

<style scoped>
.text-field {
  background-color: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  border: 1ps solid var(--md-sys-color-outline);
}

.text-field__filled {
  background-color: var(--md-sys-color-surface-variant);
}

.text-field__error {
  border-color: var(--md-sys-color-error);
}

.text-field__success {
  border-color: var(--md-extended-color-success-color);
}

.text-field__warn {
  border-color: var(--md-extended-color-warn-color);
}

</style>