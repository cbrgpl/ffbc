<script lang="ts" setup>
import { ref } from "vue";
import QLoginForm, { type AuthForm } from "./q-login-form.vue";
import { useLogin } from "@/features/login-with-credentials/index.ts";
import { useRouter } from "vue-router";

defineOptions({
  name: "q-auth",
});

const { login, loginProcessing } = useLogin();
const router = useRouter();

const errorMessage = ref<string | null>(null);

const handleSubmitted = async (authForm: AuthForm) => {
  try {
    errorMessage.value = null;

    const authorized = await login({
      username: authForm.login,
      password: authForm.password,
    });

    if (authorized) {
      router.push({ name: "Home" });

      return;
    }

    errorMessage.value = "Wrong login or password";
  } catch {
    errorMessage.value = "Something went wrong during authorization";
  }
};
</script>

<template>
  <section class="auth-page">
    <QLoginForm
      :loading="loginProcessing"
      :error-message="errorMessage"
      @submitted="handleSubmitted"
    />
  </section>
</template>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: inherit;
}
</style>
