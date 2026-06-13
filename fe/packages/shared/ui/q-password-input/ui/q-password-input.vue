<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "q-password-input",
});

const $props = defineProps<{
  label: string;
  name: string;
}>();

const inputType = ref<"text" | "password">("text");
</script>

<template>
  <UFormField
    :label="$props.label"
    :name="$props.name"
  >
    <UInput :type="inputType">
      <template #trailing>
        <UButton
          class="password-input__button"
          icon="i-mdi-account-box"
          variant=""
          color=""
        />
      </template>
    </UInput>
  </UFormField>
</template>
