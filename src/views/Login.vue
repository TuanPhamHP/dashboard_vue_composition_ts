<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerLogin />
  </div>
 </DefaultLayout>
</template>

<script lang="ts">
 import { reactive, ref, defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue";
 import ContainerLogin from "@/components/containers/ContainerLogin.vue";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerLogin,
  },
  setup: () => {
   return {};
  },
  watch: {},
  methods: {},
 });
</script>
