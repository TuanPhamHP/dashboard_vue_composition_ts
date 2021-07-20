<template>
  <div class="main-login">
    <ContainerLogin />
  </div>
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

<style>
.main-login {
  padding-right: 12px !important;
  padding-left: 12px !important;
  padding-top: 60px;
  background-color: #034ea2;
  height: 100%;
}
</style>
