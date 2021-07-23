<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerOrder />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerOrder from "@/components/containers/ContainerOrder.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerOrder,
    },
    
    methods:{
       
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "Order",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
 });
</script>