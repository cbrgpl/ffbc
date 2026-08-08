<script setup lang="ts">
defineOptions({
  name: "q-failed-fetch-alert",
});

const $props = withDefaults(
  defineProps<{
    error: Error;
    loading?: boolean;
    title?: string;
  }>(),
  {
    loading: false,
    title: "Failed to load data",
  },
);

const $emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <UAlert
    class="shrink-0"
    color="error"
    variant="solid"
    icon="i-lucide-circle-alert"
    :title="$props.title"
    :description="$props.error.message"
  >
    <template #actions>
      <UButton
        label="Retry"
        color="neutral"
        variant="soft"
        size="xl"
        class="w-full justify-center mt-3"
        :loading="$props.loading"
        @click="$emit('retry')"
      />
    </template>
  </UAlert>
</template>
