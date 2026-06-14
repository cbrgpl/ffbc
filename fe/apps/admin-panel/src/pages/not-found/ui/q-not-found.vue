<script lang="ts" setup>
defineOptions({
  name: "q-not-found",
});
</script>

<template>
  <section class="not-found-page">
    <div class="not-found-page__content">
      <p class="not-found-page__code">404</p>
      <h1 class="not-found-page__title">Page not found</h1>
      <p class="not-found-page__description">This mock page stands in for missing admin-panel routes.</p>

      <UButton
        icon="i-mdi-arrow-left"
        label="Go home"
        to="/home"
      />
    </div>
  </section>
</template>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: inherit;
  padding: 24px;
}

.not-found-page__content {
  width: min(100%, 420px);
  text-align: center;
}

.not-found-page__code {
  margin: 0 0 8px;

  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: var(--ui-primary);
}

.not-found-page__title {
  margin: 0;

  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--ui-text);
}

.not-found-page__description {
  margin: 12px 0 24px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--ui-text-muted);
}
</style>
