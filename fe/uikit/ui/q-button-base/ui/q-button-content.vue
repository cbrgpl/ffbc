<script lang="ts" setup>
import { QText } from "~uikit/ui/q-text";
import type { SizeProps } from "~uikit/libs/standard";

import type { ButtonContentProps } from "../types";

defineOptions({
  name: "q-button-content",
});

const props = defineProps<ButtonContentProps & SizeProps>();

defineSlots<{
  /** Replaces the whole content, removes original text */
  default?: () => unknown;
  /** Adds extra content before text */
  prepend?: () => unknown;
}>();
</script>

<template>
  <div
    data-qt="q-button-content-root"
    :class="[
      'button-content',
      {
        'button-content_xs': props.size === 'xs',
        'button-content_sm': props.size === 'sm',
        'button-content_md': props.size === 'md',
        'button-content_lg': props.size === 'lg',
        'button-content_xl': props.size === 'xl',
      },
    ]"
  >
    <slot>
      <slot name="prepend"></slot>
      <QText
        v-if="props.text"
        data-qt="q-button-content-text"
        :lines="1"
      >
        {{ props.text }}
      </QText>
    </slot>
  </div>
</template>

<style scoped>
.button-content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.button-content_xs {
  gap: 0.25rem;
}

.button-content_sm {
  gap: 0.5rem;
}

.button-content_md {
  gap: 0.5rem;
}

.button-content_lg {
  gap: 0.75rem;
}

.button-content_xl {
  gap: 1rem;
}
</style>
