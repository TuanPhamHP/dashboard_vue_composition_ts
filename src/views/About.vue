<template>
 <DefaultLayout>
  <div class="about">
   <h1>This is an about page</h1>
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
  },
 });
</script>
