<script lang="ts" setup>
import { QCard } from '~/ui/q-card';
import { QButton } from '~/ui/q-button';
import { QTextField } from '~/ui/q-text-field';


defineOptions({
  name: 'QAuth'
})

const loading = ref(false)

const form = ref({
  name: '',
  surname: '',
  stickIl: '',
})

const test = () => {
  console.log('asd')
  loading.value = true
}

</script>

<template>
  <div>
    <QCard width="100%" max-width="650px" as="form" footer-alignment="right" >
      <template #default>
        <QTextField label="Имя" placeholder="Дмитрий" />
        <QTextField label="Фамилия" placeholder="Пономаренко" />
        <QTextField label="ID Палки" placeholder="Х1 Б193 СС229" />
      </template>

      <template #footer>
        {{ loading }}
        <QButton text="Hello world" @click="test" :loading="loading" color="secondary" tooltip="helo wold" size="md" width="100%"  />
      </template>
    </QCard>
  </div>
</template>