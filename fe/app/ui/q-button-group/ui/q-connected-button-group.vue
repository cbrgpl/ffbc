<script lang="ts" setup>
import type { ButtonBaseProps } from "~/ui/q-button-base";
import QButtonGroup from "./q-button-group.vue";
import type { ConnectedButtonGroupSeg } from "../types";
import QConnectedButtonGroupSeg from "./q-connected-button-group-seg.vue";
import type { SizeProps } from "~/utils/ui-toolkit";

defineOptions({
  name: "q-connected-button-group",
});

const props = withDefaults(
  defineProps<
    {
      segs: ConnectedButtonGroupSeg[];
      disabled?: boolean;
    } & Pick<ButtonBaseProps, "form"> &
      SizeProps
  >(),
  {
    size: "md",
    form: "square",
  },
);

const modelValue = defineModel<unknown>();
</script>

<template>
  <QButtonGroup
    form="square"
    :size="props.size"
    class="connected-button-group"
  >
    <QConnectedButtonGroupSeg
      v-for="seg of props.segs"
      :key="seg.key ?? `${seg.value}`"
      :disabled="props.disabled"
      :seg="seg"
      :class="[
        'connected-button-group__seg',
        {
          'connected-button-group__seg_xs': props.size === 'xs',
          'connected-button-group__seg_sm': props.size === 'sm',
          'connected-button-group__seg_md': props.size === 'md',
          'connected-button-group__seg_lg': props.size === 'lg',
          'connected-button-group__seg_xl': props.size === 'xl',
          'connected-button-group__seg_round': props.form === 'round',
          'connected-button-group__seg_square': props.form === 'square',
          'connected-button-group__seg_active': seg.value === modelValue,
        },
      ]"
      :model-value="modelValue === seg.value"
      @update:model-value="modelValue = seg.value"
    />
  </QButtonGroup>
</template>

<style scoped>
.connected-button-group {
  gap: 0.125rem;
}

.connected-button-group__seg {
  border-radius: var(--seg-border) !important;
}

.connected-button-group__seg:first-of-type {
  border-radius: var(--seg-border-edge) var(--seg-border) var(--seg-border) var(--seg-border-edge) !important;
}

.connected-button-group__seg:last-of-type {
  border-radius: var(--seg-border) var(--seg-border-edge) var(--seg-border-edge) var(--seg-border) !important;
}

.connected-button-group__seg_xs {
  --seg-border: 0.25rem;
  --seg-border-edge: var(--seg-border);
}

.connected-button-group__seg_round.connected-button-group__seg_xs {
  --seg-border-edge: 1rem;
}

.connected-button-group__seg_active.connected-button-group__seg_xs {
  --seg-border: 1.5rem;
  --seg-border-edge: 1.5rem;
}

.connected-button-group__seg_sm {
  --seg-border: 0.5rem;
  --seg-border-edge: var(--seg-border);
}

.connected-button-group__seg_round.connected-button-group__seg_sm {
  --seg-border-edge: 1.25rem;
}

.connected-button-group__seg_active.connected-button-group__seg_sm {
  --seg-border: 1.5rem;
  --seg-border-edge: 1.5rem;
}

.connected-button-group__seg_md {
  --seg-border: 0.5rem;
  --seg-border-edge: var(--seg-border);
}

.connected-button-group__seg_round.connected-button-group__seg_md {
  --seg-border-edge: 1.75rem;
}

.connected-button-group__seg_active.connected-button-group__seg_md {
  --seg-border: 6.25rem;
  --seg-border-edge: 6.25rem;
}

.connected-button-group__seg_lg {
  --seg-border: 1rem;
  --seg-border-edge: var(--seg-border);
}

.connected-button-group__seg_round.connected-button-group__seg_lg {
  --seg-border-edge: 4.25rem;
}

.connected-button-group__seg_active.connected-button-group__seg_lg {
  --seg-border: 6.25rem;
  --seg-border-edge: 6.25rem;
}

.connected-button-group__seg_xl {
  --seg-border: 1.25rem;
  --seg-border-edge: var(--seg-border);
}

.connected-button-group__seg_round.connected-button-group__seg_xl {
  --seg-border-edge: 4.25rem;
}

.connected-button-group__seg_active.connected-button-group__seg_xl {
  --seg-border: 6.25rem;
  --seg-border-edge: 6.25rem;
}
</style>
