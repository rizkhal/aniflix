<script setup lang="ts">
import Icon from "../../components/Icon.vue";

const toggleSidebar = () => {};
</script>
<template>
  <div class="sticky top-0 z-40">
    <div
      class="w-full h-20 px-6 bg-gray-100 border-b flex items-center justify-between"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="lg:hidden flex items-center mr-4">
          <button
            class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
            <svg
              class="h-5 w-5"
              v-bind:style="{ fill: 'black' }"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <nav
          v-if="!$route.meta.backButton && $route.meta.title"
          class="flex space-x-6 font-medium text-primary-600"
        >
          <h1 class="text-xl font-body">
            {{ $route.meta.title }}
          </h1>
        </nav>
        <div v-if="$route.meta.backButton && !$route.meta.title">
          <button
            @click="$router.go(-1)"
            class="flex flex-row space-x-2 items-center text-primary-600"
          >
            <Icon name="ArrowLeftIcon" class="w-6 h-6" />
            <span class="text-xl font-body">Kembali</span>
          </button>
        </div>
        <div v-if="$route.meta.backButton && $route.meta.title">
          <button
            @click="$router.go(-1)"
            class="flex flex-row space-x-2 items-center text-primary-600"
          >
            <Icon name="ArrowLeftIcon" class="w-6 h-6" />
            <span class="text-xl font-body">{{ $route.meta.title }}</span>
          </button>
        </div>
      </div>
    </div>
    <!-- dropdown menu end -->
  </div>
</template>
