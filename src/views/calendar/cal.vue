<template>
  <VCalendar :initial-page="{ month: 6, year: 2018 }" :attributes="attributes" />
</template>
  
<script setup>
import { ref } from 'vue';

const attributes = ref([
  {
    // Boolean
    dot: true,
    dates: [
      new Date(2018, 5, 1),
      new Date(2018, 5, 10),
      new Date(2018, 5, 22),
    ],
  },
  {
    // Object
    dot: {
      style: {
        backgroundColor: '#1DE9B6',
      },
    },
    dates: [
      new Date(2018, 5, 12),
      new Date(2018, 5, 26),
      new Date(2018, 5, 15),
    ],
  },
]);
</script>
  