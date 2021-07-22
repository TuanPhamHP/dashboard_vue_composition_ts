<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerConsignee />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerConsignee from "@/components/containers/ContainerConsignee.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerConsignee,
    },
    
    methods:{
       
    }
 });
</script>