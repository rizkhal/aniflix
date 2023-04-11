<script setup lang="ts" name="ProtectedLayout">
import ModalProvider from "../providers/modal/ModalProvider.vue";
import DashboardProvider from "../providers/dashboard/DashboardProvider.vue";
</script>

<template>
  <DashboardProvider>
    <ModalProvider>
      <slot />
    </ModalProvider>
  </DashboardProvider>
</template>
