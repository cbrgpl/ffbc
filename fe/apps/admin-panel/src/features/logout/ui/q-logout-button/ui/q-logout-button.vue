<script lang="ts" setup>
import { useLogout } from "../../../composables/use-logout";
import { usePointer } from "@vueuse/core";

defineOptions({
  name: "q-logout-button",
});

const $props = withDefaults(
  defineProps<{
    label?: boolean;
  }>(),
  {
    label: true,
  },
);

const $emit = defineEmits<{
  loggedOut: [];
}>();

const { pointerType } = usePointer();

const { logout, logoutProcessing } = useLogout();

const handleClick = async () => {
  const loggedOut = await logout();

  if (loggedOut) {
    $emit("loggedOut");
  } else {
    window.location.reload();
  }
};
</script>

<template>
  <UTooltip
    text="Logout"
    :disabled="pointerType !== 'mouse'"
    :ui="{ content: 'z-60' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-log-out"
      :label="$props.label ? 'Logout' : undefined"
      :loading="logoutProcessing"
      :disabled="logoutProcessing"
      @click="handleClick"
    />
  </UTooltip>
</template>
