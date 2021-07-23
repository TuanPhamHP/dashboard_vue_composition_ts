<template>
 <div class="w-100 breadcrumb-top">
  <span v-if="breadCrumb.ableToBack" class="align-justify-center mr-4 pointer btn-back-page" @click="onGoBack">
   <img src="../../assets/images/arrow-left.svg" alt="" />
  </span>
  <span class="title-page font-size-32 font-weight-bold text-uppercase display-flex align-center">
   {{ breadCrumb.hasStatus ? breadCrumb.viewTxt + ":" : breadCrumb.viewTxt }}
  </span>
  <span v-if="breadCrumb.hasStatus" class="title-page pl-3 font-size-32 font-weight-bold text-uppercase display-flex align-center status-color">
   {{ breadCrumb.statusTxt }}
  </span>
 </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import { mapState } from "vuex";
 export default Vue.extend({
  computed: {
   ...mapState({
    currentBreadcrumb: (state: any): any => state.currentBreadcrumb,
    breadCrumb: (state: any): any => state.breadCrumb,
   }),
  },
  methods: {
   handleBreadClick: (_data: Record<string, unknown>) => {
    if (_data.disabled) {
     return;
    }
    console.log(_data);
   },
   onGoBack() {
    this.$router.push(this.breadCrumb.rootRouter.indexOf("/") === 0 ? this.breadCrumb.rootRouter : "/" + this.breadCrumb.rootRouter);
   },
  },
 });
</script>

<style lang="scss">
 @import "@/assets/style/_variables.scss";
 .each-breadcum {
  /* color: ; */
 }
 .breadcrumb-top {
  margin-top: 16px;
  padding-left: 30px !important;
  display: flex;
  .btn-back-page {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: #ffffff;
  }
  .status-color {
   color: $GPEstatusText !important;
  }
 }
</style>
