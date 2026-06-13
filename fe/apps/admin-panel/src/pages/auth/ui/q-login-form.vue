<script lang="ts">
import * as z from "zod";

const schema = z.object({
  login: z.string().min(3),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/[`~!@#$%^&*()_"№;:?+]/),
});

export type AuthForm = z.output<typeof schema>;
</script>

<script lang="ts" setup>
import { ref } from "vue";

import { QPasswordInput } from "@ffbc/shared";

defineOptions({
  name: "q-auth",
});

const $emit = defineEmits<{
  submitted: [form: AuthForm];
}>();

const state = ref<Partial<AuthForm>>({
  login: undefined,
  password: undefined,
});
</script>

<template>
  <UForm :schema="schema">
    <UFormField
      label="Login"
      name="login"
    >
      <UInput v-model="state.login" />
    </UFormField>
    <UButton variant="" />
    <QPasswordInput
      label="Password"
      name="asd"
    />
  </UForm>
</template>

<style scoped></style>
