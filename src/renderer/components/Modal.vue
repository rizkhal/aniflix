<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { appendContent } from "video.js/dist/types/utils/dom";
import {
  h,
  ref,
  Ref,
  render,
  computed,
  reactive,
  Component,
  VNode,
  watch,
  inject,
  AppContext,
} from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute();

const context = inject<AppContext | null>("appContext", null);

const props: { position: string; maxWidth: string } = reactive({
  position: "top-center",
  maxWidth: "md",
});

const positionClass = computed(() => {
  return {
    "top-center": "justify-center items-start",
    center: "justify-center items-center",
  }[props.position];
});

const maxWidthClass = computed(() => {
  return {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "4xl": "sm:max-w-4xl",
    "7xl": "sm:max-w-7xl",
  }[props.maxWidth];
});

const isOpen: Ref<boolean> = ref(false);
const bodyRef: Ref<Component | any> = ref();

function closeModal() {
  isOpen.value = false;
}

type Modal = {
  body: VNode;
};

const modal: Modal = reactive({
  body: h("div"),
});

function openModal({ body }: Modal) {
  isOpen.value = true;

  Object.assign(props, body.props);

  body.appContext = context;

  setTimeout(() => {
    render(body, bodyRef.value);
  });
}

defineExpose({
  isOpen,
  openModal,
  closeModal,
});

watch(
  () => route,
  (to, from) => {
    closeModal();
  },
  { deep: true }
);
</script>
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition duration-100 bg-slate-900/60 overflow-y-auto backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div :class="positionClass" class="flex min-h-screen p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="maxWidthClass"
              class="w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div ref="bodyRef">
                <!-- rendered using JSX -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
