<template>
 <div class="w-100 top-marker">
  <h4 class="m-0 bread-header px-4 pt-2">Đây là Header Breadcrumb</h4>
 </div>
</template>

<script lang="ts">
 import Vue from "vue";
 export default Vue.extend({});
</script>

<style lang="scss">
 @import "@/assets/style/_variables.scss";
 .top-marker {
  height: 58px;
  background-color: $variantsColor;
  .bread-header {
   color: #fff;
   font-weight: 400;
  }
 }
</style>
