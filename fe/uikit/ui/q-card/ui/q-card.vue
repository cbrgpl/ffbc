<script lang="ts" setup>
import { type PrimitiveProps, Primitive } from "reka-ui";
import { type DimensionProps, type LoadingProps, type UnavailableProps, useDimension, useUiContext } from "~uikit/libs/standard";

defineOptions({
  name: "q-card",
});

const $props = withDefaults(
  defineProps<
    {
      /** Enables/disables padding */
      padding?: boolean;
      /** Visual tone of the card container background */
      tone?: "plain" | "subtle" | "strong" | "inverse";
      /** Alignment of content in footer */
      footerAlignment?: "left" | "center" | "right" | "justify";
    } & DimensionProps &
      PrimitiveProps &
      LoadingProps &
      UnavailableProps
  >(),
  {
    padding: true,
    tone: "plain",
    as: "div",
    footerAlignment: "left",
  },
);

defineSlots<{
  /** Card header. Used for utilities. */
  header?: (props: { loading: boolean; disabled: boolean; readonly: boolean }) => unknown;
  /** Card body. Used for primary content */
  default?: (props: { loading: boolean; disabled: boolean; readonly: boolean }) => unknown;
  /** Card footer. Used for actions or additional content */
  footer?: (props: { loading: boolean; disabled: boolean; readonly: boolean }) => unknown;
}>();

const { context } = useUiContext();

const { dimensionStyle } = useDimension($props);
</script>

<template>
  <Primitive
    :class="[
      'card',
      {
        'card_tone-plain': $props.tone === 'plain',
        'card_tone-subtle': $props.tone === 'subtle',
        'card_tone-strong': $props.tone === 'strong',
        'card_tone-inverse': $props.tone === 'inverse',
      },
    ]"
    :style="dimensionStyle"
    :as="$props.as"
    :as-child="$props.asChild"
  >
    <div class="card__header">
      <slot
        name="header"
        :loading="context.loading"
        :disabled="context.disabled"
        :readonly="context.readonly"
      ></slot>
    </div>
    <div class="card__body">
      <slot
        :loading="context.loading"
        :disabled="context.disabled"
        :readonly="context.readonly"
      ></slot>
    </div>
    <div
      :class="[
        'card__footer',
        {
          'card__footer_align-left': $props.footerAlignment === 'left',
          'card__footer_align-center': $props.footerAlignment === 'center',
          'card__footer_align-right': $props.footerAlignment === 'right',
          'card__footer_align-justify': $props.footerAlignment === 'justify',
        },
      ]"
    >
      <slot
        name="footer"
        :loading="context.loading"
        :disabled="context.disabled"
        :readonly="context.readonly"
      ></slot>
    </div>
  </Primitive>
</template>

<style scoped>
.card {
  --card-bg: var(--surface-container);
  --card-fc: var(--on-surface);
  --card-border-color: transparent;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 1rem;
  border: 1px solid var(--card-border-color);
  border-radius: 0.75rem;

  color: var(--card-fc);

  background-color: var(--card-bg);
}

.card--tone-plain {
  --card-bg: var(--surface-container);
  --card-fc: var(--on-surface);
}

.card--tone-subtle {
  --card-bg: var(--surface-container-high);
  --card-fc: var(--on-surface);
}

.card--tone-strong {
  --card-bg: var(--surface-variant);
  --card-fc: var(--on-surface-variant);
}

.card--tone-inverse {
  --card-bg: var(--inverse-surface);
  --card-fc: var(--inverse-on-surface);
}

.card__footer {
  display: flex;
}

.card__footer_align-left {
  justify-content: flex-start;
}

.card__footer_align-center {
  justify-content: center;
}

.card__footer_align-right {
  justify-content: flex-end;
}

.card__footer_align-justify {
  justify-content: space-between;
}
</style>
