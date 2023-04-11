<script setup lang="ts">
import { menus, generals } from "../menus";
import Icon from "../../../components/Icon.vue";
import Logo from "../../../components/Logo.vue";
import { useRouter } from "vue-router";
import { MenuItem } from "../../../typings";
import AuthRequiredModal from "../../../components/modal/AuthRequiredModal.vue";
import { authRequiredRoutes } from "../../../routes";
import { Ref, h, inject } from "vue";

const router = useRouter();
const modal: any = inject<Ref>("modalRef");

const logout = () => {
  localStorage.clear();
  router.push({ name: "login" });
};

const navigate = ({ route }: MenuItem) => {
  if (authRequiredRoutes.includes(route)) {
    modal.value.openModal({
      id: "authRequiredModal",
      body: h(AuthRequiredModal, {
        position: "center",
      }),
    });
  } else {
    router.push({
      path: route,
    });
  }
};
</script>
<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen hidden lg:block bg-slate-100 dark:bg-slate-800 dark:border-slate-900 border-r z-30"
    id="main-nav"
  >
    <div
      class="w-full h-20 border-b dark:border-slate-900 dark:bg-slate-800 flex px-4 items-center mb-8"
    >
      <Logo />
    </div>

    <div
      class="mt-4 pl-4 mb-4 flex flex-col gap-y-4 text-gray-500 dark:text-slate-200 fill-gray-500 text-sm"
    >
      <div class="text-gray-400/70 font-medium uppercase font-body">Menu</div>
      <button
        v-for="(menu, index) in menus"
        :key="index.toString()"
        :class="{ 'router-link-active': $route.path === menu.route }"
        class="flex items-center space-x-2 py-1 group hover:border-r-4 hover:border-r-primary-600 hover:font-semibold"
        @click="navigate(menu)"
      >
        <Icon :name="menu.icon" class="w-5 h-5" />
        <span class="font-body text-sm">{{ menu.label }}</span>
      </button>

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
