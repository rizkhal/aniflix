<script setup lang="ts" name="ProtectedLayout">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useWelcome } from "../stores";
import { ucfirst, wait } from "../utils";
import ModalProvider from "../providers/modal/ModalProvider.vue";
import DashboardProvider from "../providers/dashboard/DashboardProvider.vue";

const store = useWelcome();
const { isShow } = storeToRefs(store);

onMounted(() => {
  if (isShow.value) {
    const user: { username: string } = JSON.parse(
      localStorage.getItem("user") || ""
    );

    wait(500).then(() => {
      toast(`Selamat datang kembali ${ucfirst(user.username)} 😽`, {
        theme: "colored",
      });

      store.show(false);
    });
  }
});
</script>

<template>
  <DashboardProvider>
    <ModalProvider>
      <slot />
    </ModalProvider>
  </DashboardProvider>
</template>
