<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerOderDetailPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerOderDetailPage from "@/components/containers/ContainerOderDetailPage.vue";
 export default defineComponent({
    components: {
      DefaultLayout,
      ContainerOderDetailPage,
    },
    
    methods:{
       
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "Order 2021070011:CREATING",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
 });
</script>