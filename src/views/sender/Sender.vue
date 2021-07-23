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
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "SENDER LIST",
         ableToBack: false,
         rootRouter: "/",
         hasStatus: false,
         statusTxt: "",
      });
    },
    methods:{
       
    }
 });
</script>