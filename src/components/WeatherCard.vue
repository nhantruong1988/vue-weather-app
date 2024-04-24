<template>
  <div class=" grid justify-items-center" v-if="weatherData && !loading">
    <div class="text-white p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden bg-sky-300  max-w-fit w-full">
      <div class="mb-2 flex justify-center items-center">
        <div class="grid items-center justify-center gap-2">
          <h1 class="text-2xl uppercase text-center">{{ weatherData.name }}</h1>
          <h1 class="text-md mb-5text-center">{{ convertedTime(weatherData?.timezone) }}</h1>
        </div>
      </div>
      <div class="text-center flex-1">
        <img :src="`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`" alt="icon"
          class="mx-auto w-24" />
        <h1 class="text-7xl mb-2">{{ Math.round(weatherData?.main.temp) }}&deg;</h1>
        <p class="capitalize">Feels like {{ Math.round(weatherData?.main.feels_like) }}&deg;</p>
        <p class="text-md mb-2 uppercase">{{ weatherData.weather[0]?.description }}</p>
      </div>
    </div>
</div>
</template>
<script setup>
import { defineProps } from 'vue';

const { weatherData, loading } = defineProps(['weatherData', 'loading']);
const convertedTime = (timezone) => {
  const currentTime = new Date();
  const timezoneOffsetMinutes = timezone / 60;
  const convertedTime = new Date(currentTime.getTime() + timezoneOffsetMinutes * 60000);
  return convertedTime.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  });
}
</script>