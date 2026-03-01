<script lang="ts" setup>
import { useUiContext, type SizeProps, type UnavailableProps, type ColorProps } from "~uikit/libs/standard";
import { QIcon, type Icons } from "~uikit/ui/q-icon";
import {
  QButtonBase,
  QButtonContent,
  useToggleCore,
  type ToggleCoreProps,
  type ButtonBaseProps,
  type ButtonContentProps,
} from "~uikit/ui/q-button-base";

import { useButtonBaseMapping, type ButtonProps } from "../composables/use-button-base-mapping";
import { useSize } from "../composables/use-injection";

defineOptions({
  name: "q-ibutton",
});

const $props = withDefaults(
  defineProps<
    {
      /** Icon */
      icon: Icons;
      /** Changes button width type */
      width?: "default" | "narrow" | "wide";
    } & ButtonProps<"default" | "tonal" | "outline" | "standard"> &
      ButtonBaseProps &
      ButtonContentProps &
      ToggleCoreProps &
      UnavailableProps &
      Pick<ColorProps, "theme"> &
      SizeProps
  >(),
  {
    form: "square",
    variant: "default",
    size: "md",
    type: "button",
    width: "default",
  },
);

const { context } = useUiContext();

const { compSize, compForm, compVariant } = useSize(
  () => $props.size,
  () => $props.form,
  () => $props.variant,
);

const selected = defineModel<boolean>("selected");

const { mappedInitialVariant } = useButtonBaseMapping(true, compVariant, () => $props.toggle);

const { borderRadiusClasses, buttonBaseVariant } = useToggleCore(
  {
    round: "ibutton_round",
    square: "iibutton_square",
  },
  compForm,
  mappedInitialVariant,
  selected,
);
</script>

<template>
  <QButtonBase
    :class="[
      'ibutton',
      {
        ibutton_xs: compSize === 'xs',
        ibutton_sm: compSize === 'sm',
        ibutton_md: compSize === 'md',
        ibutton_lg: compSize === 'lg',
        ibutton_xl: compSize === 'xl',
      },
      ...borderRadiusClasses,
    ]"
    :variant="buttonBaseVariant"
    :disabled="context.disabled || context.loading"
    :type="$props.type"
  >
    <QButtonContent
      class="ibutton__content"
      :text="$props.text"
      :icon="$props.icon"
    >
      <QIcon
        class="ibutton__icon"
        :name="$props.icon"
      />
    </QButtonContent>
  </QButtonBase>
</template>

<style scoped>
.ibutton_round {
  border-radius: 6.25rem;
}

.ibutton_xs .ibutton__icon {
  width: 1.25rem;
  height: 1.25rem;
}

.ibutton_xs.ibutton_square {
  border-radius: var(--radius-xs);
}

.ibutton_sm .ibutton__icon {
  width: 1.5rem;
  height: 1.5rem;
}

.ibutton_sm.ibutton_square {
  border-radius: var(--radius-xs);
}

.ibutton_md .ibutton__icon {
  width: 1.5rem;
  height: 1.5rem;
}

.ibutton_md.ibutton_square {
  border-radius: var(--radius-md);
}

.ibutton_lg .ibutton__icon {
  width: 2rem;
  height: 2rem;
}

.ibutton_lg.ibutton_square {
  border-radius: var(--radius-lg);
}

.ibutton_xl .ibutton__icon {
  width: 2.5rem;
  height: 2.5rem;
}

.ibutton_xl.ibutton_square {
  border-radius: var(--radius-lg);
}

.ibutton_xs .ibutton__content {
  padding: 0.375rem;
}

.ibutton_sm .ibutton__content {
  padding: 0.5rem;
}

.ibutton_md .ibutton__content {
  padding: 1rem;
}

.ibutton_lg .ibutton__content {
  padding: 2rem;
}

.ibutton_xl .ibutton__content {
  padding: 3rem;
}

.ibutton_narrow.ibutton_xs .ibutton__content {
  padding: 0.375rem 0.25rem;
}

.ibutton_narrow.ibutton_sm .ibutton__content {
  padding: 0.5rem 0.25rem;
}

.ibutton_narrow.ibutton_md .ibutton__content {
  padding: 1rem 0.75rem;
}

.ibutton_narrow.ibutton_lg .ibutton__content {
  padding: 2rem 1rem;
}

.ibutton_narrow.ibutton_xl .ibutton__content {
  padding: 3rem 2rem;
}

.ibutton_wide.ibutton_xs .ibutton__content {
  padding: 0.375rem 0.625rem;
}

.ibutton_wide.ibutton_sm .ibutton__content {
  padding: 0.5rem 0.875rem;
}

.ibutton_wide.ibutton_md .ibutton__content {
  padding: 1rem 1.5rem;
}

.ibutton_wide.ibutton_lg .ibutton__content {
  padding: 2rem 3rem;
}

.ibutton_wide.ibutton_xl .ibutton__content {
  padding: 3rem 4.5rem;
}

.iibutton_square.ibutton_xs {
  border-radius: 0.75rem;
}

.iibutton_square.ibutton_sm {
  border-radius: 0.75rem;
}

.iibutton_square.ibutton_md {
  border-radius: 1rem;
}

.iibutton_square.ibutton_lg {
  border-radius: 1.75rem;
}

.iibutton_square.ibutton_xl {
  border-radius: 1.75rem;
}
</style>
