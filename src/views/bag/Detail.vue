<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerBagDetailPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerBagDetailPage from "@/components/containers/ContainerBagDetailPage.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerBagDetailPage,
    },
    methods:{
       
    }
 });
</script>