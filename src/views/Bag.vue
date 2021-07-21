<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerTablePage />
   <DialogBag :is-visible="isVisible" :selected-data="selectedData"/>
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent, reactive, ref } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue"; 
 import ContainerTablePage from "@/components/containers/ContainerTablePage.vue";
 import DialogBag from "@/components/Form/DialogBag.vue";
 export default defineComponent({
    components: {
    DefaultLayout,
    ContainerTablePage,
    DialogBag
    },
    setup:()=>{
        let isVisible=ref<boolean>(false);
        let selectedData = reactive<Record<string, unknown>>({});
        return{isVisible,selectedData}
    }
 });
</script>