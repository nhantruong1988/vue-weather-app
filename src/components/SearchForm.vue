<template >
  <form @submit.prevent="handleButtonSearch" class="grid justify-items-center mb-10">
    <div class="relative flex h-10 w-full min-w-[300px] max-w-[24rem] bg-white">
      <button
        class="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
        type="submit" data-ripple-light="true">
        SEARCH
      </button>
      <input type="text"
        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        required v-model="querySearch" @input="getCitiesResult" />
      <ul class="absolute bg-white text-black w-full shadow-md p-4 top-[40px] z-[100] rounded-[7px]"
        v-if="cities?.length > 0 && querySearch != null">
        <li v-for="city in cities" :key="city.id" class="py-2 cursor-pointer hover:text-pink-500"
          @click="chooseCity(city)">
          {{ city.place_name }}
        </li>
      </ul>
      <label
        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
        Country Name
      </label>
    </div>
  </form>
</template>
<script setup>
import CityService from '@/services/CityService';
import { ref, defineEmits } from 'vue';

const emit = defineEmits('search');
const querySearch = ref('');
const loading = ref(false);
const cities = ref([]);
const searchError = ref(null);

const getCitiesResult = async () => {
  loading.value = true;
  if (querySearch.value !== "") {
    try {
      const res = await CityService.fetchCities(querySearch.value);
      cities.value = res.features;
    }
    catch {
      searchError.value = true;
    }
    finally {
      loading.value = false;
    }
  }
};
const chooseCity = (city) => {
  querySearch.value = city.place_name;
  cities.value = null;
}
const handleButtonSearch = () => {
  emit('search', querySearch.value);
};

</script>
