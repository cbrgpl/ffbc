<script setup lang="ts">
import { Label } from 'reka-ui'
import { useId } from 'vue';

import type { FieldBaseProps, FieldBaseSlots } from './../types'
import { QText } from '~/ui/q-text';

defineOptions({
  name: 'QFieldBase'
})

const $props = defineProps<{
  /** Defines variant of field.
   * classic means <label field> in column
   * label-field means <label field> in row
   * field-label means <field label> in row
   */
  variant: 'classic' | 'label-field' | 'field-label';
} & FieldBaseProps>();

defineSlots<FieldBaseSlots & {
  default?: ( props: { fieldId: string } ) => unknown;
}>()

const fieldId = useId()

</script>

<template>
  <div class="field-base">
    <div :class="[
      'field-base__field-wrapper',
      {
        'field-base__field-wrapper_classic': $props.variant === 'classic',
        'field-base__field-wrapper_in-row': $props.variant !== 'classic',
        'field-base__field-wrapper_field-label': $props.variant === 'field-label'
      }
    ]">
      <Label :for="fieldId">
        <QText>
          <slot name="label">
            {{ $props.label }}
          </slot>
        </QText>
      </Label>
      <slot :field-id="fieldId">
        field_base_default_slot
      </slot>
    </div>
    <Label v-if="$props.tip" class="field-base__tip">
      <QText>
        {{ $props.tip }}
      </QText>
    </Label>
    <Label v-if="$props.errorMessage" class="field-base__error-message">
      <QText>
        {{ $props.errorMessage }}
      </QText>
    </Label>
  </div>
</template>

<style scoped>
.field-base {
  display: flex;
  flex-direction: column;
}

.field-base__field-wrapper {
  display: flex;
}

.field-base__field-wrapper_classic {
  flex-direction: column;
  gap: 0.25rem;
}

.field-base__field-wrapper_in-row {
  gap: 0.375rem;
}

.field-base__field-wrapper_field-label {
  flex-direction: row-reverse;
}

.field-base__tip {
  color: var(--md-sys-color-on-surface-variant);
  margin-top: 0.125rem;
}

.field-base__error-message {
  color: var(--md-sys-color-error);
  margin-top: 0.25rem;
}
</style>