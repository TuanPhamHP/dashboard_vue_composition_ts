<template>
 <div class="page-container">
  <div class="page-content page-create-order">
    <div class="mb-7 box-top">
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Creator </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Creator" class="max-width-74" v-model="formData.creator" />
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
          <input type="text" placeholder="Parcels Received" class="max-width-74" v-model="formData.parcel_received" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class="col-xxl-3"> Gross Weight (kg) </span>
        <span class="col-xxl-9 form-input">
          <input type="text" placeholder="Gross Weight (kg)" class="max-width-74" v-model="formData.gross_weight" />
        </span>
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class=" mb-4 text-decoration-underline add-package display-flex justify-flex-end pr-87px pointer"> Add a new Sender </span>
        <span class="col-xxl-3"> Sender </span>
        <span class="col-xxl-9 form-input display-flex align-center">
          <!-- <v-select
            :items="listSender"
            placeholder="Alain Maurice"
            class="form-input max-width-74"
            outlined
          ></v-select> -->
          <v-autocomplete
            v-model="defaultSender"
            :items="listSender"
            item-text="name"
            item-value="id"
            outlined
            dense
            placeholder="Alain Maurice"
            class="form-input max-width-74"
            @change="(val)=>{handerSelecChange(val,'sender_id')}"
          >
          </v-autocomplete>
          <img src="@/assets/images/Compose-message.svg" style="margin-left:20px" class="pointer" alt="">
        </span>
        
      </div>
      <div class="row my-0 display-flex detail-data align-center">
        <span class=" mb-4 text-decoration-underline add-package display-flex justify-flex-end pr-87px pointer"> Add a new Consignee </span>
        <span class="col-xxl-3"> Consignee </span>
        <span class="col-xxl-9 form-input display-flex align-center">
          <!-- <v-select
            :items="listConsignee"
            placeholder="Teing Phong"
            class="form-input max-width-74"
            outlined
          ></v-select> -->
          <v-autocomplete
            v-model="defaultConsignee"
            :items="listConsignee"
            item-text="name"
            item-value="id"
            outlined
            dense
            placeholder="Teing Phong"
            class="form-input max-width-74"
            @change="(val)=>{handerSelecChange(val,'consignee_id')}"
          >
          </v-autocomplete>
          <img src="@/assets/images/Compose-message.svg" style="margin-left:20px" class="pointer" alt="">
        </span>
      </div>
    </div>
    <p class="text-error" style="">{{messageErr}}</p>
    <div class="mb-4  display-flex justify-flex-end max-width-74">
      <v-btn class="buton-secondary text-transform-unset button-size mr-4 ">
        Cancel
      </v-btn>
      <v-btn @click="createOrder" class="buton-primary text-transform-unset button-size" :loading="loadingBtn">
        Create
      </v-btn>
    </div>
  </div>
 </div>
</template>

<script lang="ts">
 import { defineComponent, onMounted, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import route from "@/router/index";
 import { mapState } from "vuex";
 export default defineComponent({
  components: {
  },
  setup: (props,ctx) => {
   let formData  = ref<Record<string,any>>({}) 
   let defaultSender = ref<Record<string,any>>({}) 
   let defaultConsignee = ref<Record<string,any>>({}) 
   let listSender  = ref<Record<string,string>[]>([])
   let listConsignee  = ref<Record<string,string>[]>([])
   const loadingBtn = ref<boolean>(false);
   const messageErr = ref<string>('');
   const setLoadingBtn = (payload: boolean) => {
    loadingBtn.value = payload;
   };
  const setDataFormValue = (payload: Record<string,any>) => {
    formData.value = {
      ...formData.value,
      ...payload
    };
   };

   const getAllSender = async (query: Record<string, unknown>) => {
    const res = await api.senders.getAll(query);
    if (!res) {
     return;
    }
    try {
      if(res.status > 199 && res.status < 399 ){
        listSender.value = res.data.data.senders
      }
    } catch (error) {
     console.log(error);
    }
   };
   onMounted(getAllSender);
   const getAllConsignee = async (query: Record<string, unknown>) => {
    const res = await api.consignee.getAllConsignee(query);
    if (!res) {
     return;
    }
    try {
      if(res.status > 199 && res.status < 399 ){
        listConsignee.value = res.data.data.consignees
      }
    } catch (error) {
     console.log(error);
    }
   };
   onMounted(getAllConsignee);

   const createOrder = async () => {
    messageErr.value= ""
    let body = {
      ...formData.value,
    }
    setLoadingBtn(true);
    const res = await api.order.create(body);
    setLoadingBtn(false);
    if (!res) {
      ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Update error",
      });
      return;
    }
    try {
      if(res.status > 199 && res.status < 399 ){
        let _data =  res.data.data.order
        ctx.root.$store.commit("SET_SNACKBAR", {
            type: "success",
            title: "",
            content: "Create success",
        });
        ctx.root.$router.push(`/order/${res.data.data.order.id}`)
      }
      else{
        messageErr.value = res.data.data.error||res.data.message
        ctx.root.$store.commit("SET_SNACKBAR", {
            type: "error",
            title: "",
            content: "Create error",
        });
      }
    } catch (error) {
      messageErr.value = error
      ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Create error",
      });
    }
   };
   const handerSelecChange = (val:any,feild:string)=>{
     let _obj:Record<string, unknown> = {}
     _obj[`${feild}`] = val
     setDataFormValue(_obj)
     
   }
   return {
      loadingBtn,
      formData,
      listSender,
      defaultSender,
      listConsignee,
      defaultConsignee,
      messageErr,
      createOrder,
      handerSelecChange
   };
  },
 });
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
  .page-create-order {
    &.page-create-order{
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
            .v-select__slot{
              .v-input__append-inner{
                margin-top: 15px;
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
