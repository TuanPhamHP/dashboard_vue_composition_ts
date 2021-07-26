<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerUserPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent  } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerUserPage from "@/components/containers/ContainerUserPage.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerUserPage,
    },
    created(){
      this.$store.commit("SET_BREADCRUMB", {
         viewTxt: "USER LIST",
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