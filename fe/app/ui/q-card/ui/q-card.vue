<script lang="ts" setup>
import { type PrimitiveProps, Primitive } from 'reka-ui';
import { type DimensionProps, type FeedbackStatusProps, type LoadingProps, type UiProps, type UnavailableProps, useDimension, useUiContext } from '~/utils/ui-toolkit';

defineOptions({
  name: 'QCard'
})

const $props = withDefaults(defineProps<{
  /** Enables/disables padding */ 
  padding?: boolean
  /** Visual tone of the card container background */
  tone?: 'plain' | 'subtle' | 'strong' | 'inverse';
  /** Alignment of content in footer */
  footerAlignment?: 'left' | 'center' | 'right' | 'justify';
} & DimensionProps & FeedbackStatusProps<'error' | "success" | 'warn'> & PrimitiveProps & LoadingProps & UnavailableProps>(), {
  padding: true,
  tone: 'plain',
  as: 'div',
  footerAlignment: 'left'
})

defineSlots<{
  /** Card header. Used for utilities. */
  'header'?: ( props: { loading: boolean; disabled: boolean; readonly: boolean } ) => unknown;
  /** Card body. Used for primary content */
  'default'?: ( props: { loading: boolean; disabled: boolean; readonly: boolean } ) => unknown;
  /** Card footer. Used for actions or additional content */
  'footer'?: ( props: { loading: boolean; disabled: boolean; readonly: boolean } ) => unknown;
}>()

const { uloading, udisabled, ureadonly } = useUiContext($props)

const { dimensionStyles } = useDimension($props)

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
        'card_status-success': $props.status === 'success',
        'card_status-warn': $props.status === 'warn',
        'card_status-error': $props.status === 'error',
      }
    ]"
    :style="dimensionStyles"
    :as="$props.as" :as-child="$props.asChild">
    <div class="card__header">
      <slot name="header" :loading="uloading" :disabled="udisabled" :readonly="ureadonly" />
    </div>
    <div class="card__body">
      <slot :loading="uloading" :disabled="udisabled" :readonly="ureadonly" />
    </div>
    <div :class="[
      'card__footer',
      {
        'card__footer_align-left': $props.footerAlignment === 'left',
        'card__footer_align-center': $props.footerAlignment === 'center',
        'card__footer_align-right': $props.footerAlignment === 'right',
        'card__footer_align-justify': $props.footerAlignment === 'justify',
      }
    ]">
      <slot name="footer" :loading="uloading" :disabled="udisabled" :readonly="ureadonly" />
    </div>
  </Primitive>

</template>

<style scoped>

.card {
  --card-bg: var(--md-sys-color-surface-container);
  --card-fg: var(--md-sys-color-on-surface);
  --card-border-color: transparent;

  background-color: var(--card-bg);
  color: var(--card-fg);

  border-radius: 0.75rem;
  border: 1px solid var(--card-border-color);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.card--tone-plain {
  --card-bg: var(--md-sys-color-surface-container);
  --card-fg: var(--md-sys-color-on-surface);
}

.card--tone-subtle {
  --card-bg: var(--md-sys-color-surface-container-high);
  --card-fg: var(--md-sys-color-on-surface);
}

.card--tone-strong {
  --card-bg: var(--md-sys-color-surface-variant);
  --card-fg: var(--md-sys-color-on-surface-variant);
}

.card--tone-inverse {
  --card-bg: var(--md-sys-color-inverse-surface);
  --card-fg: var(--md-sys-color-inverse-on-surface);
}

.card--status-success {
  --card-border-color: var(--md-extended-color-success-color);
  --card-bg: color-mix(
    in srgb,
    var(--card-bg) 88%,
    var(--md-extended-color-success-color-container) 12%
  );
}

.card--status-warn {
  --card-border-color: var(--md-extended-color-warn-color);
  --card-bg: color-mix(
    in srgb,
    var(--card-bg) 88%,
    var(--md-extended-color-warn-color-container) 12%
  );
}

.card--status-error {
  --card-border-color: var(--md-sys-color-error);
  --card-bg: color-mix(
    in srgb,
    var(--card-bg) 88%,
    var(--md-sys-color-error-container) 12%
  );
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