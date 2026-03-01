<script lang="ts" setup>
import type { SizeProps } from "~/utils/ui-toolkit";

import { QButtonBase, QButtonContent, type ButtonContentProps } from "~/ui/q-button-base";
import { type Icons, QIcon } from "~/ui/q-icon";
import { QZIndexProvider } from "~/utils/use-z-index";

const props = withDefaults(
  defineProps<
    SizeProps<"md" | "lg" | "xl"> & {
      /** Icon */
      icon: Icons;
      /** Changes stylization of the fab */
      variant: "primary" | "secondary" | "tertiary" | "primary-container" | "secondary-container" | "tertiary-container";
      /** Button text. Makes button extende */
      text?: string;
      /** Button position */
      position: "tl" | "tm" | "tr" | "rm" | "br" | "bm" | "bl" | "lm";
    } & ButtonContentProps
  >(),
  {
    size: "md",
    form: "default",
    text: "",
  },
);

const positionStyles = computed(() => {
  if (!props.position) {
    return {};
  }

  const tokens = props.position.split("");
  const margin = `1rem`;

  const styles: Record<string, string> = {};

  if (tokens.includes("t")) {
    styles.top = margin;
  }

  if (tokens.includes("r")) {
    styles.right = margin;
  }

  if (tokens.includes("b")) {
    styles.bottom = margin;
  }

  if (tokens.includes("l")) {
    styles.left = margin;
  }

  if (props.position === "rm" || props.position === "lm") {
    styles.translate = "0 50%";
    styles.bottom = "50%";
  }

  if (props.position === "tm" || props.position === "bm") {
    styles.translate = "50% 0";
    styles.right = "50%";
  }

  return styles;
});
</script>

<template>
  <QZIndexProvider>
    <template #default="{ zIndex }">
      <QButtonBase
        :style="{ zIndex, ...positionStyles }"
        :class="[
          'fab',
          {
            'fab_md title-medium': $props.size === 'md',
            'fab_lg title-large': $props.size === 'lg',
            'fab_xl headline-small': $props.size === 'xl',
            fab_extended: $props.text,
          },
        ]"
        :variant="$props.variant"
        elevation
        type="button"
      >
        <QButtonContent
          class="fab__content"
          :text="$props.text"
        >
          <template #prepend>
            <QIcon
              class="fab__icon"
              :name="$props.icon"
            />
          </template>
        </QButtonContent>
      </QButtonBase>
    </template>
  </QZIndexProvider>
</template>

<style scoped>
.fab {
  position: fixed;
  display: flex;
}

.fab__icon {
  width: 1lh;
  height: 1lh;
}

.fab_md {
  border-radius: 1rem;
}

.fab_md .fab__content {
  padding: 1rem;
}

.fab_lg {
  border-radius: 1.25rem;
}

.fab_lg .fab__content {
  padding: 1.625rem;
}

.fab_xl {
  border-radius: 1.75rem;
}

.fab_xl .fab__content {
  padding: 1.875rem;
}

.fab_xl.fab_extended {
  padding: 1.875rem 1.75rem;
}
</style>
