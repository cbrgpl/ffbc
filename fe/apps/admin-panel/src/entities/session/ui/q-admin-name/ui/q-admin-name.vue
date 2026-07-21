<script lang="ts" setup>
import type { Session } from "@/entities/session/model/session";

defineOptions({
  name: "q-admin-name",
});

const $props = defineProps<{
  session: Session;
}>();
</script>

<template>
  <div>
    <span>
      {{ $props.session.username }}
    </span>
  </div>
</template>
