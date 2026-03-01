<script lang="ts" setup>
import { useSize, type ColorProps, type SizeProps } from "~uikit/libs/standard";

defineOptions({
  name: "q-carousel-loader",
});

const $props = withDefaults(
  defineProps<
    {
      /** Loader variant */
      variant?: "linear" | "square";
      /** Position loader over relative container, also adds mask */
      floating?: boolean;
    } & Pick<ColorProps, "color"> &
      SizeProps
  >(),
  {
    size: "xs",
    variant: "square",
    floating: false,
  },
);

const { sizeClasses } = useSize($props);

const viewBox = computed(() => {
  if ($props.variant === "linear") {
    return "0 0 85 36";
  } else return "-1 -2 26 26";
});

const colorCssVars = computed<{ "--fill-color": string; "--stroke-color": string }>(() => {
  const cssVars = (() => {
    switch ($props.color) {
      case "secondary":
        return { "--fill-color": "--secondary-container", "--stroke-color": "--secondary" };
      case "tertiary":
        return { "--fill-color": "--tertiary-container", "--stroke-color": "--tertiary" };
      case "error":
        return { "--fill-color": "--error-container", "--stroke-color": "--error" };
      default:
        return { "--fill-color": "--primary-container", "--stroke-color": "--primary" };
    }
  })();

  return { "--fill-color": `var(${cssVars["--fill-color"]})`, "--stroke-color": `var(${cssVars["--stroke-color"]})` };
});
</script>

<template>
  <svg
    :class="[
      'carousel-loader',
      {
        'carousel-loader_square': $props.variant === 'square',
        'carousel-loader_linear': $props.variant === 'linear',
        'carousel-loader_floating': $props.floating,
      },
      ...sizeClasses,
    ]"
    :style="colorCssVars"
    :viewBox="viewBox"
    role="img"
    aria-label="Loading"
  >
    <g class="item i1">
      <path d="M16 2l-2 2h-4l-2-2-4 2 2 4 2-1v12h8V8l2 1 2-4-4-2zm-4 6v8m0-6v2" />
    </g>
    <g class="item i2">
      <path d="M6 7h12l-1 7-3-1-2 3-2-3-3 1-1-7z" />
    </g>
    <g class="item i3">
      <path d="M16.5 6l-1.8 2.2h-5.4L7.5 3 3 5l2 4 3-1v12h8V8l3 1 2-4-4.5-2z" />
    </g>
  </svg>
</template>

<style scoped>
.carousel-loader {
  --stroke-color: #566;
  --fill-color: #123;

  color: currentcolor;
}

.carousel-loader_floating {
  position: absolute;
  inset: 0;
}

.carousel-loader .item {
  transform-origin: center;
  transform-box: fill-box;

  fill: var(--fill-color);
  stroke: var(--stroke-color);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.carousel-loader_linear .item {
  animation: linear-carousel 3s linear infinite;
}

.carousel-loader_linear .i2 {
  animation-delay: -1s;
}

.carousel-loader_linear .i3 {
  animation-delay: -2s;
}

@keyframes linear-carousel {
  0%,
  10% {
    transform: translate(-5px, 0) scale(0.7);
    opacity: 0;
  }

  45%,
  55% {
    transform: translate(30px, 12px) scale(1.2);
    opacity: 1;
  }

  85%,
  100% {
    transform: translate(70px, 0) scale(0.7);
    opacity: 0;
  }
}

.carousel-loader_square .item {
  aspect-ratio: 1;
  animation: square-carousel 3s ease-in-out infinite;
}

.carousel-loader_square .i2 {
  animation-delay: -1s;
}

.carousel-loader_square .i3 {
  animation-delay: -2s;
}

@keyframes square-carousel {
  0%,
  33% {
    transform: scale(0);
    opacity: 0;
  }

  34% {
    transform: scale(0.7);
    opacity: 0;
  }

  45% {
    transform: scale(1.15);
    opacity: 1;
  }

  65% {
    transform: scale(1);
    opacity: 0;
  }

  66%,
  100% {
    transform: 0 scale(0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-loader .shirt {
    opacity: 1;
    animation: none;
  }
}
</style>
