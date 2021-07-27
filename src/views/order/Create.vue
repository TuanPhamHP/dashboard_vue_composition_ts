<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerCreateOderPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerCreateOderPage from "@/components/containers/ContainerCreateOderPage.vue";
 export default defineComponent({
    components: {
      DefaultLayout,
      ContainerCreateOderPage,
    },
    
    methods:{
       
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "Order: New order",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
 });
</script>