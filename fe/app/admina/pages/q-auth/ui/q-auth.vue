<script lang="ts" setup>
import { QCard } from "~/ui/q-card";
import { QButton } from "~/ui/q-button";
import { QTextField } from "~/ui/q-text-field";
import { useDisplay, BreakpointValues } from "~/utils/display/lib/display";
import { QLayout, vFillLayout } from "~/ui/q-layout";
import { QCarouselLoader } from "~/ui/q-carousel-loader";

defineOptions({
  name: "q-auth",
  directives: {
    vFillLayout,
  },
});

const loading = ref(false);
const { breakpoint, displayWidth } = useDisplay();

const form = ref({
  name: "",
  surname: "",
  stickIl: "",
});

const test = () => {
  loading.value = true;
};
</script>

<template>
  <QLayout
    v-fill-layout
    name="auth"
  >
    <QCard
      class="auth__form"
      width="100%"
      as="form"
      max-width="650px"
      footer-alignment="right"
    >
      <template #default>
        <QTextField
          label="Имя"
          placeholder="Дмитрий"
          status="warn"
        />
        <QTextField
          label="Фамилия"
          size="md"
          placeholder="Пономаренко"
          status="success"
        />
        <QTextField
          disabled
          label="ID Палки"
          size="lg"
          placeholder="Х1 Б193 СС229"
          status="error"
        />
      </template>

      <template #footer>
        <QButton
          text="Hello world"
          :loading="loading"
          color="secondary-container"
          tooltip="helo wold"
          size="md"
          width="100%"
          :full-width="displayWidth <= BreakpointValues.SD"
          @click="test"
        />
      </template>
    </QCard>
  </QLayout>
</template>

<style scoped>
.auth__form {
  margin: auto;
}
</style>
