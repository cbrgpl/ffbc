<script lang="ts" setup>
defineOptions({
  name: "q-example-component",
});

defineProps<{
  text: string;
}>();
</script>

<template>
  <p>{{ text }}</p>
</template>
