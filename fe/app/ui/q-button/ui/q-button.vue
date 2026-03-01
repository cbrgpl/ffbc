<script lang="ts" setup>
import {
  useUiContext,
  type SizeProps,
  useDimension,
  type DimensionProps,
  type UnavailableProps,
  type ColorProps,
} from "~/utils/ui-toolkit";
import { QIcon, type Icons } from "~/ui/q-icon";

import {
  QButtonBase,
  QButtonContent,
  useToggleCore,
  type ToggleCoreProps,
  type ButtonBaseProps,
  type ButtonContentProps,
} from "~/ui/q-button-base";
import { useButtonBaseMapping, type ButtonProps } from "../composables/use-button-base-mapping";
import { useSize } from "../composables/use-injection";

defineOptions({
  name: "q-button",
});

const props = withDefaults(
  defineProps<
    {
      /** Adds an icon */
      icon?: Icons | null;
    } & ButtonProps<"default" | "tonal" | "outline" | "elevated" | "text"> &
      ButtonBaseProps &
      ButtonContentProps &
      ToggleCoreProps &
      UnavailableProps &
      Pick<ColorProps, "theme"> &
      SizeProps &
      DimensionProps
  >(),
  {
    form: "square",
    variant: "default",
    size: "md",
    type: "button",
    icon: null,
  },
);

const { context } = useUiContext();
const { dimensionStyle } = useDimension(props);

const { compSize, compForm, compVariant } = useSize(
  () => props.size,
  () => props.form,
  () => props.variant,
);

const selected = defineModel<boolean>("selected");

const { mappedInitialVariant } = useButtonBaseMapping(false, compVariant, () => props.toggle);

const { borderRadiusClasses, buttonBaseVariant } = useToggleCore(
  {
    round: "button_round",
    square: "button_square",
  },
  compForm,
  mappedInitialVariant,
  selected,
);
</script>

<template>
  <QButtonBase
    :class="[
      'button',
      {
        button_elevated: compVariant === 'elevated',
        'button_xs label-large': compSize === 'xs',
        'button_sm label-large': compSize === 'sm',
        'button_md title-medium': compSize === 'md',
        'button_lg headline-small': compSize === 'lg',
        'button_xl headline-large': compSize === 'xl',
      },
      ...borderRadiusClasses,
    ]"
    :style="{ ...dimensionStyle }"
    :variant="buttonBaseVariant"
    :disabled="context.disabled || context.loading"
    :type="props.type"
  >
    <QButtonContent
      class="button__content"
      :text="props.text"
      :icon="props.icon"
    >
      <template #prepend>
        <QIcon
          v-if="props.icon"
          class="button__icon"
          :name="props.icon"
        />
      </template>
    </QButtonContent>
  </QButtonBase>
</template>

<style scoped>
.button_elevated {
  box-shadow: var(--elevation-3);
}

.button_elevated:disabled {
  box-shadow: none;
}

.button_round {
  border-radius: 6.25rem;
}

.button_xs .button__content {
  padding: 0.375rem 0.75rem;
}

.button_xs.button_square {
  border-radius: var(--radius-xs);
}

.button_sm .button__content {
  padding: 0.625rem 1rem;
}

.button_sm.button_square {
  border-radius: var(--radius-xs);
}

.button_md .button__content {
  padding: 1rem 1.5rem;
}

.button_md.button_square {
  border-radius: var(--radius-md);
}

.button_lg .button__content {
  padding: 2rem 3rem;
}

.button_lg.button_square {
  border-radius: var(--radius-lg);
}

.button_xl .button__content {
  padding: 3rem 4rem;
}

.button_xl.button_square {
  border-radius: var(--radius-lg);
}

.button__icon {
  width: 1lh;
  height: 1lh;
}
</style>
