<script setup lang="ts">
import { menus, generals } from "./menus";
import Icon from "../../components/Icon.vue";
import Logo from "../../components/Logo.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push({ name: "login" });
};
</script>
<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-4 items-center mb-8">
      <Logo />
    </div>

    <div
      class="mt-4 pl-4 mb-4 flex flex-col gap-y-4 text-gray-500 fill-gray-500 text-sm"
    >
      <div class="text-gray-400/70 font-medium uppercase font-body">Menu</div>
      <router-link
        v-for="(menu, index) in menus"
        :key="index.toString()"
        class="flex items-center space-x-2 py-1 group hover:border-r-4 hover:border-r-primary-600 hover:font-semibold"
        :to="menu.route"
      >
        <Icon :name="menu.icon" class="w-5 h-5" />
        <span class="font-body text-sm">{{ menu.label }}</span>
      </router-link>

      <div class="mt-8 text-gray-400/70 font-medium uppercase font-body">
        General
      </div>
      <router-link
        :to="general.route"
        class="flex items-center space-x-2 py-1 group hover:border-r-4 hover:border-r-primary-600 hover:font-semibold"
        href="#"
        v-for="(general, index) in generals"
        :key="index.toString()"
      >
        <Icon :name="general.icon" class="w-5 h-5" />
        <span class="font-body text-sm">{{ general.label }}</span>
      </router-link>

      <button
        @click.prevent="logout"
        class="flex items-center space-x-2 py-1 group hover:border-r-4 hover:border-r-primary-600 hover:font-semibold"
      >
        <Icon name="ArrowLeftOnRectangleIcon" class="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.router-link-active {
  @apply border-r-4 border-primary-600 text-primary-600 font-semibold;
}
</style>
