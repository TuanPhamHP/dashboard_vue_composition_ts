<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerSenderPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerSenderPage from "@/components/containers/ContainerSenderPage.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerSenderPage,
    },
    
    methods:{
       
    }
 });
</script>