<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerAcengyPage />
  </div>
 </DefaultLayout>
</template>
<script lang="ts">
 import { defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue";
 import ContainerAcengyPage from "@/components/containers/ContainerAcengyPage.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerAcengyPage,
  },
  created() {
   this.$store.commit("SET_BREADCRUMB", {
    viewTxt: "agency list",
    ableToBack: false,
    rootRouter: "/",
    hasStatus: false,
    statusTxt: "",
   });
  },
  methods: {},
 });
</script>
