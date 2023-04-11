<script setup lang="ts" name="VAuthRequiredModal">
import { onMounted } from "vue";
import { getInstance } from "../../hooks/useModal";

const modal = getInstance("authRequiredModal");
</script>
<template>
  <div>
    <div class="bg-white dark:bg-slate-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
        >
          <svg
            class="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-slate-200"
            id="modal-title"
          >
            Authentication Required
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500 dark:text-slate-400">
              You need to authenticated before continue, please create your
              account first
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-slate-100 dark:bg-slate-600 dark:border-slate-800 border-t px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
    >
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
      >
        Register
      </button>
      <button
        @click="modal.closeModal()"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-700 dark:ring-slate-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 sm:mt-0 sm:w-auto dark:text-slate-200"
      >
        Close
      </button>
    </div>
  </div>
</template>
