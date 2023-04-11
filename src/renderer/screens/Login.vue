<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { LoginCredentials } from "../typings";
import { useAuth, useWelcome } from "../stores";
import Logo from "../components/Logo.vue";
import { storeToRefs } from "pinia";

const isDev = import.meta.env.DEV;

const router = useRouter();
const store = useAuth();
const welcome = useWelcome();
const model: LoginCredentials = reactive({
  username: isDev ? "demo" : "",
  password: isDev ? "secret" : "",
});

const { loading, errors } = storeToRefs(store);

const login = () => {
  store.login(model).then(() => {
    loading.value = false;
    welcome.show(true);
    router.push("home");
  });
};
</script>
<template>
  <div
    class="w-full text-gray-900 py-36 flex min-h-screen bg-login bg-no-repeat bg-center bg-cover"
  >
    <div
      class="w-full min-h-screen absolute inset-0 flex justify-center items-center bg-black/70 backdrop-brightness-75"
    >
      <div
        class="w-full container mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center"
      >
        <div class="hidden lg:block">
          <h1 class="font-body font-bold text-[6em] text-white">AniFlix</h1>
          <p
            class="leading-relaxed text-xl w-full mt-2 font-body font-thin text-white"
          >
            Unleash your inner otaku with
            <span class="text-primary-600 font-bold">AniFlix</span>
            <span class="block">
              Your ultimate destination for anime entertainment!
            </span>
          </p>
        </div>
        <form
          @submit="login"
          class="lg:w-1/3 md:w-1/2 bg-gray-50 p-8 flex flex-col lg:ml-auto mt-10 lg:mt-0 rounded-md"
        >
          <div class="flex w-full justify-center mb-8">
            <Logo />
          </div>
          <div
            v-show="errors"
            class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              {{ errors }}
            </div>
          </div>

          <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-gray-600"
              >Username</label
            >
            <input
              type="text"
              v-model="model.username"
              class="w-full bg-white rounded-md border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600"
              >Password</label
            >
            <input
              type="password"
              v-model="model.password"
              class="w-full bg-white rounded-md border border-gray-300 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="disabled:bg-primary-400 disabled:cursor-not-allowed text-white bg-primary-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-primary-600 text-lg"
          >
            <span v-show="loading">Loading..</span>
            <span v-show="!loading">Login</span>
          </button>
          <div class="flex flex-col items-center justify-center mt-4">
            <span class="font-body text-slate-700">Or</span>
            <RouterLink
              :to="{ name: 'home' }"
              class="text-primary-500 font-body flex justify-center mt-1"
              >Continue as Guest</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
