<script lang="ts" setup>
import { QButton, QIbutton } from "~uikit/ui/q-button";
import { QFab } from "~uikit/ui/q-fab";
import { QLoadingIndicators } from "~uikit/ui/q-loading-indicators";

import { QButtonGroup, QConnectedButtonGroup, type ConnectedButtonGroupSeg } from "~uikit/ui/q-button-group";

defineOptions({
  name: "q-auth",
});

const model = ref(true);

const selectedSeg = ref<string>("");

const segs: ConnectedButtonGroupSeg[] = [
  {
    value: "1",
    text: "Segmento ones",
    icon: "check",
    selectedIcon: "close",
  },
  {
    value: "2",
    text: "Opuso",
    selectedIcon: "menu",
    disabled: () => selectedSeg.value === "1",
  },
  {
    value: "3",
    icon: "menu",
  },
];
</script>

<template>
  <div>
    <QLoadingIndicators />
    <QFab
      variant="primary-container"
      icon="arrow_back"
      position="lm"
      text="hello allabama"
    />
    <QConnectedButtonGroup
      v-model:model-value="selectedSeg"
      :segs="segs"
      form="round"
    />
    <QButtonGroup
      size="sm"
      variant="outline"
    >
      <QButton
        text="helol"
        variant="default"
        size="xs"
        icon="check"
      />
      <QButton
        text="helol"
        variant="tonal"
        size="sm"
      />
      <QButton
        text="helol"
        variant="outline"
      />
      <QButton
        text="helol"
        variant="elevated"
        size="lg"
        icon="check"
      />
      <QButton
        text="helol"
        variant="text"
        size="xl"
        icon="check"
      />
    </QButtonGroup>
    <div>
      <QButton
        toggle
        text="helol"
      />
      <QButton
        toggle
        text="helol"
        variant="tonal"
      />
      <QButton
        toggle
        text="helol"
        variant="outline"
      />
      <QButton
        toggle
        text="helol"
        variant="elevated"
      />
    </div>
    <div>
      <QButton
        v-model:selected="model"
        toggle
        text="helol"
      />
      <QButton
        v-model:selected="model"
        toggle
        text="helol"
        variant="tonal"
      />
      <QButton
        v-model:selected="model"
        toggle
        text="helol"
        variant="outline"
      />
      <QButton
        v-model:selected="model"
        toggle
        text="helol"
        variant="elevated"
      />
    </div>
    <div>
      <QButton
        disabled
        text="helol"
      />
      <QButton
        disabled
        text="helol"
        variant="tonal"
      />
      <QButton
        disabled
        text="helol"
        variant="outline"
      />
      <QButton
        disabled
        text="helol"
        variant="elevated"
      />
      <QButton
        disabled
        text="helol"
        variant="text"
      />
    </div>
    <div>
      <QIbutton
        size="xs"
        icon="check"
      />
      <QIbutton
        size="sm"
        icon="check"
        variant="tonal"
      />
      <QIbutton
        size="lg"
        icon="check"
        variant="outline"
      />
      <QIbutton
        size="xl"
        icon="check"
        variant="standard"
      />
    </div>
    <div>
      <QIbutton
        size="xl"
        icon="check"
        toggle
      />
      <QIbutton
        size="lg"
        form="round"
        icon="check"
        toggle
        variant="tonal"
      />
      <QIbutton
        size="md"
        icon="check"
        toggle
        variant="outline"
      />
      <QIbutton
        size="xs"
        icon="check"
        toggle
        variant="standard"
      />
    </div>
    <div>
      <QIbutton
        icon="check"
        toggle
        selected
      />
      <QIbutton
        icon="check"
        toggle
        selected
        variant="tonal"
      />
      <QIbutton
        icon="check"
        toggle
        selected
        variant="outline"
      />
      <QIbutton
        icon="check"
        toggle
        selected
        variant="standard"
      />
    </div>
    <div>
      <QIbutton
        icon="check"
        toggle
        selected
        disabled
      />
      <QIbutton
        icon="check"
        toggle
        selected
        disabled
        variant="tonal"
      />
      <QIbutton
        icon="check"
        toggle
        selected
        disabled
        variant="outline"
      />
      <QIbutton
        icon="check"
        toggle
        selected
        disabled
        variant="standard"
      />
    </div>
  </div>
</template>
