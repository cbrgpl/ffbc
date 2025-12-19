<script lang="ts" setup>
import './styles/globals.css'
import { initCssVars } from './utils/ui-toolkit';

import { TooltipProvider } from 'reka-ui';

if(import.meta.client) {
  document.documentElement.classList.add('light');
  initCssVars(
    useTemplateRef('root')
  )
}

</script>

<template>
  <div ref="root" style="padding: 0.5rem;">
    <TooltipProvider>
        <NuxtPage />
    </TooltipProvider>
  </div>
</template>
