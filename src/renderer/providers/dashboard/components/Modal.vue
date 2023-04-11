<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import {
  ref,
  Ref,
  render,
  computed,
  reactive,
  Component,
  VNode,
  watch,
  getCurrentInstance,
} from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { removeInstance, setInstance } from "../../../hooks/useInstance";

const route: RouteLocationNormalizedLoaded = useRoute();

type CustomProps = {
  id: string;
  position: string;
  maxWidth: string;
  onBackdropPress: Function;
};

const initialState = {
  id: "modal",
  position: "top-center",
  maxWidth: "md",
  onBackdropPress: () => {
    closeModal();
  },
};

const props: CustomProps = reactive({ ...initialState });

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
const initialFocusRef = ref<HTMLElement | undefined>();

type Modal = {
  id: string;
  body: VNode;
};

const instance = getCurrentInstance();

function resetProps() {
  for (const [key, value] of Object.entries(initialState)) {
    props[key] = value;
  }
}

// FIXME: make me better
const i = ref();

function openModal({ id, body }: Modal) {
  resetProps(); // ensure `resetProps` first

  isOpen.value = true;

  Object.assign(props, body.props);

  // set modal instance
  i.value = id;
  setInstance(id, instance?.exposed ? instance.exposed : null);
  body.appContext = instance?.appContext ? instance.appContext : null;

  setTimeout(() => {
    render(body, bodyRef.value);
  });
}

function closeModal() {
  isOpen.value = false;
  removeInstance(i.value);
}

defineExpose({
  isOpen,
  openModal,
  closeModal,
  initialFocusRef,
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
    <Dialog
      as="div"
      :initial-focus="initialFocusRef"
      @close="props.onBackdropPress"
      class="relative z-50"
    >
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
              class="w-full transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 text-left align-middle shadow-xl transition-all"
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
