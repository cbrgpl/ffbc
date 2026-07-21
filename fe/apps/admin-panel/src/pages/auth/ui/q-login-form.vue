<script lang="ts">
import * as z from "zod";

const schema = z.object({
  login: z.string().min(3),
  password: z.string().min(8),
});

export type AuthForm = z.output<typeof schema>;
</script>

<script lang="ts" setup>
import { ref } from "vue";

import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";
import { QFadeTransition } from "@ffbc/shared";

defineOptions({
  name: "q-auth",
});

const $props = defineProps<{
  loading: boolean;
  errorMessage: string | null;
}>();

const $emit = defineEmits<{
  submitted: [form: AuthForm];
}>();

const fields: AuthFormField[] = [
  {
    name: "login",
    type: "text",
    label: "Login",
    placeholder: "Enter your login",
    required: true,
    defaultValue: "admin@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
    defaultValue: "adminadmin",
  },
];

const onSubmit = (event: FormSubmitEvent<AuthForm>) => {
  $emit("submitted", JSON.parse(JSON.stringify(event.data)));
};
</script>

<template>
  <UPageCard>
    <UAuthForm
      title="Admin panel login"
      description="Enter your credentials to access admin panel."
      :schema="schema"
      icon="i-mdi-tape-measure"
      :fields="fields"
      :loading="$props.loading"
      :disabled="$props.loading"
      @submit="onSubmit"
    >
      <template #validation>
        <QFadeTransition
          appear
          :duration="150"
        >
          <UAlert
            v-if="$props.errorMessage"
            color="error"
            icon="i-lucide-info"
            :title="$props.errorMessage"
            variant="outline"
          />
        </QFadeTransition>
      </template>
    </UAuthForm>
  </UPageCard>
</template>
