<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerTableManifestDetail />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerTableManifestDetail from "@/components/containers/ContainerTableManifestDetail.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerTableManifestDetail
  },

 });
</script>