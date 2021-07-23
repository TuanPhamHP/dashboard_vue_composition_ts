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
       
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "CONSIGNEE LIST",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
 });
</script>