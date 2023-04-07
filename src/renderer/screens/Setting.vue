<script setup lang="ts">
//
</script>
<template>
  <div class="mt-4">
    <div class="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
      <div class="w-1/3 mx-2 mt-1 text-slate-700">
        <span class="font-body">Provider</span>
        <div class="text-xs leading-relaxed text-gray-500 mt-1 font-light">
          Provider merupakan channel anime streaming anda, ini merupakan lokasi
          anime akan diambil dan ditampilkan.
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
          <select class="w-full p-2 rounded bg-white shadow-sm border">
            <option>Samehadaku</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
      <div class="w-1/3 mx-2 mt-1 text-slate-700">
        <span class="font-body">Warna Tema</span>
        <div class="text-xs leading-relaxed text-gray-500 mt-1 font-light">
          Kami menyediakan berbagai warna untuk memberikan anda pengalaman
          penggunaan aplikasi AniFlix yang luar biasa.
        </div>
      </div>
      <div class="flex-1 flex flex-col md:flex-row sm:mt-2 md:items-center">
        <div class="w-full flex-1 mx-2">
          <select class="w-full p-2 rounded bg-white shadow-sm border">
            <option>Default</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row">
      <div
        class="md:block hidden w-72 mx-2 font-bold h-6 mt-3 text-gray-800"
      ></div>
      <div
        class="flex-1 flex flex-col space-y-4 md:space-y-0 md:justify-end md:flex-row"
      >
        <button
          class="bg-primary-600 py-1 px-4 text-xs rounded-md text-primary-100"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>
