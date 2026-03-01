<script lang="ts" setup>
import type { SizeProps } from "~uikit/libs/standard";
import { useProvide } from "~uikit/libs/use-injection";
import type { ButtonBaseProps } from "~uikit/ui/q-button-base";
import type { ButtonProps } from "~uikit/ui/q-button/composables/use-button-base-mapping";

import { SIZE_INJ_KEY } from "../static";

defineOptions({
  name: "q-button-group",
});

const $props = withDefaults(defineProps<SizeProps & Pick<ButtonBaseProps, "form"> & ButtonProps<"default" | "tonal" | "outline">>(), {
  form: "round",
  variant: "tonal",
  size: "md",
});

useProvide(SIZE_INJ_KEY, () => ({
  size: $props.size,
  form: $props.form,
  variant: $props.variant,
}));
</script>

<template>
  <div
    :class="[
      'button-group',
      {
        'button-group_xs': $props.size === 'xs',
        'button-group_sm': $props.size === 'sm',
        'button-group_md': $props.size === 'md',
        'button-group_lg': $props.size === 'lg',
        'button-group_xl': $props.size === 'xl',
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
}

.button-group_xs {
  gap: 1.125rem;
}

.button-group_sm {
  gap: 0.75rem;
}

.button-group_md {
  gap: 0.5rem;
}

.button-group_lg {
  gap: 0.5rem;
}

.button-group_xl {
  gap: 0.5rem;
}
</style>
