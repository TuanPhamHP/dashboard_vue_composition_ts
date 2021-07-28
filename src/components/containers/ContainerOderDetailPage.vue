<template>
 <div class="page-container page-container-detail-order">
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab
        v-for="(item,index) in listTabs"
        :key="item"
      >
        {{ `${index+1}. ${item}` }}
      </v-tab>
    </v-tabs>
    <div class="page-content page-detail-order">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Create></Create>
        </v-tab-item>
        <v-tab-item>
          <Package></Package>
        </v-tab-item>
        <v-tab-item>
          <Create></Create>
        </v-tab-item>
        <v-tab-item>
          <Create></Create>
        </v-tab-item>
      </v-tabs-items>
    </div>
 </div>
</template>

<script lang="ts">
 import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import route from "@/router/index";
 import Create from "@/components/Form/order/Create.vue";
 import Package from "@/components/Form/order/Package.vue";
 import { mapState } from "vuex";
 export default defineComponent({
  components: {
    Create,
    Package
  },
  data() {
   return {
    listTabs:['Overview','Packages','Delivery','Payment']
   };
  },
  setup: props => {
   let tab  = ref<number>(1)
   
   return {
      tab,
   };
  },
  watch: {
   
  },
  computed: {
   
  },
  methods:{

  }
 });
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
  .page-container-detail-order{
    .theme--light.v-tabs > .v-tabs-bar {
      background-color: transparent;
      .v-slide-group__content {
        .v-tabs-slider-wrapper{
          display: none;
        }
        .v-tab{
          background-color: #FFFFFF;
          margin: 0 5px;
          border: 1px solid #D5D5D5; 
          border-bottom-width: 0;
          border-radius: 14px 14px 0px 0px;
          min-width: 200px;
          color: #898989;
          justify-content: flex-start;
          text-transform: unset;
          &.v-tab--active{
            background-color: #E7EEFF;
            color: #2F6BFF;
            border-color: #2F6BFF;
          }
        }
      }
    }
  }
  .page-content {
    &.page-detail-order{
      position: relative;
      z-index: 1;
      padding: 60px 50px 60px 70px;
    }
    .max-width-74{
      max-width: calc(100% - 74px); 
      width: calc(100% - 74px); 
    }
    .pr-87px{
      padding-right: 87px !important;
    }
    .add-package {
      color: $GPEaddLink;
    }
    border-radius: 14px;
    padding: 35px 35px;
    & > .v-card__title {
      padding-top: 0 !important;
      padding-bottom: 40px !important;
      font-size: 32px !important;
      color: $primaryBlack;
      font-weight: 700 !important;
    }
    .border-width-2px {
      border-width: 2px !important;
    }
    .button-size {
      height: 56px !important;
      padding: 0 60px !important;
      border-radius: 12px;
    }
  }
</style>
