<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerBagPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerBagPage from "@/components/containers/ContainerBagPage.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerBagPage,
    },
    
    methods:{
       
    }
 });
</script>