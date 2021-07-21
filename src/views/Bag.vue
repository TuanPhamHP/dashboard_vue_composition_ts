<template>
 <DefaultLayout>
  <div class="px-3">
    <v-btn @click="isVisible=true">create</v-btn>
   <ContainerTablePage />
   <DialogBag :is-visible="isVisible" :selected-data="selectedData" @handlerCancel="handlerDialogCancel" @handlerSubmit="handlerDialogSubmit"/>
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
    data(){
        return{
            isVisible:false
        }
    },
    setup:()=>{
        let selectedData = reactive<Record<string, unknown>>({});
        return{selectedData}
    },
    methods:{
        handlerDialogCancel(){
            this.isVisible = false;
        },
        handlerDialogSubmit(value:any){
            console.log(value);
            
        }
    }
 });
</script>