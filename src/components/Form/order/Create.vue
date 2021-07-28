<template>
  <div class="tab-create">
    <div class="mb-7 box-top">
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Order Number </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Order Number" class="max-width-74" v-model="formData.status" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Creator </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Creator" class="max-width-74" v-model="formData.status" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Order Date </span>
        <span class="col-xxl-9 form-input">
          <input type="date" placeholder="Order Date" class="max-width-74" v-model="formData.order_date" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Parcels Received </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Parcels Received" class="max-width-74" v-model="formData.parcelsr_eceived" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Gross Weight (kg) </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Gross Weight (kg)" class="max-width-74" v-model="formData.status" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class=" mb-4 text-decoration-underline add-package display-flex justify-flex-end pr-87px"> Add a new Sender </span>
        <span class="col-xxl-3"> Sender </span>
        <span class="col-xxl-9 form-input display-flex align-center">
          <v-select
            :items="listSender"
            placeholder="Alain Maurice"
            class="form-input max-width-74"
            outlined
          ></v-select>
          <img src="@/assets/images/Compose-message.svg" style="margin-left:20px" class="pointer" alt="">
        </span>
        
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class=" mb-4 text-decoration-underline add-package display-flex justify-flex-end pr-87px"> Add a new Consignee </span>
        <span class="col-xxl-3"> Consignee </span>
        <span class="col-xxl-9 form-input display-flex align-center">
          <v-select
            :items="listConsignee"
            placeholder="Teing Phong"
            class="form-input max-width-74"
            outlined
          ></v-select>
          <img src="@/assets/images/Compose-message.svg" style="margin-left:20px" class="pointer" alt="">
        </span>
        
      </div>
    </div>
    <div class="mb-4  display-flex justify-flex-end max-width-74">
      <v-btn class="buton-secondary text-transform-unset button-size mr-4 ">
        Cancel
      </v-btn>
      <v-btn class="buton-primary text-transform-unset button-size">
        Create
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
 import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import route from "@/router/index";
 import { mapState } from "vuex";
 export default defineComponent({
  components: {
  },
  data() {
   return {
    listTabs:['Overview','Packages','Delivery','Payment']
   };
  },
  setup: props => {
   let tab  = ref<number>(1)
   let formData:Record<string,string>  = reactive({})
   
   return {
      tab,
      formData
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
  .tab-create{
    position: relative;
    z-index: 1;
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
    & > .v-card__title {
      padding-top: 0 !important;
      padding-bottom: 40px !important;
      font-size: 32px !important;
      color: $primaryBlack;
      font-weight: 700 !important;
    }
    .box-top {
      .detail-data {
        color: $GPEdarkText;
        margin-bottom: 30px !important;
        .form-input{
          &>input {
            border: 0.6px solid #d5d5d5;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 16px;
            color: $GPEdetailData;
            height: 52px;
            outline: none;
            padding: 0 15px;
            &::placeholder {
              font-size: 16px;
              color: $GPEdetailData;
            }
            &:disabled {
              background-color: #fafafa;
            }
          }
          &.v-select {
            border: 0.6px solid #d5d5d5;
            .v-input__slot{
              margin-bottom: 0;
              min-height: 52px;
              input {
                width: 100%;
                box-sizing: border-box;
                border-radius: 4px;
                height: 52px;
                font-size: 16px;
                font-weight: 400;
                color: $GPEinputText;
                outline: unset;
                padding: 0 3px;
                &::placeholder {
                  color: $GPEinputText;
                  font-size: 16px;
                }
              }
            }
            fieldset,.v-text-field__details{
              display: none;
            }
          }

        }
      }
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
