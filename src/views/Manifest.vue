<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerTableManifest />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerTableManifest from "@/components/containers/ContainerTableManifest.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerTableManifest
  },

 });
</script>