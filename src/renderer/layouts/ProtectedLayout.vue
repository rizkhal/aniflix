<script setup lang="ts" name="ProtectedLayout">
import DashboardProvider from "../providers/dashboard/DashboardProvider.vue";
import ModalProvider from "../providers/modal/ModalProvider.vue";
</script>

<template>
  <DashboardProvider>
    <ModalProvider>
      <slot />
    </ModalProvider>
  </DashboardProvider>
</template>
