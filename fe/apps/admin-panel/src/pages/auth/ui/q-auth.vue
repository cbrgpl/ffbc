<script lang="ts" setup>
defineOptions({
  name: "q-auth",
});

const test = async () => {
  const res = await fetch("/input-characteristic");

  if (res.status === 200) {
    const a = await res.json();
  }
};
</script>

<template>
  <section>
    <UButton
      color="primary"
      @click="test"
      >Auth button</UButton
    >
    <UButton color="error">Auth button</UButton>
  </section>
</template>
