<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerShipping />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerShipping from "@/components/containers/ContainerShipping.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerShipping,
    },
    
    methods:{
       
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "SHIPPING PARTNER LIST",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
 });
</script>