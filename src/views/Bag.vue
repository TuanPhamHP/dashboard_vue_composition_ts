<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerTablePage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerTablePage from "@/components/containers/ContainerTablePage.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerTablePage
  },

 });
</script>