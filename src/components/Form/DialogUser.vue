<template>
  <v-dialog v-model="isVisible" persistent max-width="740">
    <v-card class="dialog-user">
      <v-card-title class="text-h5">
         <span v-if="Object.keys(selectedData).length">
          Update User Information: <span class="text-uppercase text-primary-color">{{selectedData.tax_code?selectedData.tax_code:''}}</span>
        </span>
        <span v-else>
          Create new user
        </span>
      </v-card-title>
      <v-card-text class="form-list scrollbar-y">
        <div class="form-item mb-5">
          <span class="form-lable"> Company </span>
          <v-select
            :items="listCompany"
            placeholder="Company"
            class="form-input"
            outlined
            @change="(val)=>{handerSelecChange(val,'company')}"
          ></v-select>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Full Name </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Full Name"
              v-model="formData.name"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Profile </span>
          <v-select
            :items="listProfile"
            placeholder="Profile"
            class="form-input"
            outlined
            @change="(val)=>{handerSelecChange(val,'profile')}"
          ></v-select>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Phone Number </span>
          <span class="form-input">
            <input
              type="number"
              placeholder="Phone Number"
              v-model="formData.phone"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Email </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Email"
              v-model="formData.email"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Password: </span>
          <span class="form-input">
            <input type="password" placeholder="Password" v-model="formData.password" />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Retype Password: </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Retype Password"
              v-model="formData.retype_password"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Creation Date </span>
          <span class="form-input">
            <input
              type="date"
              readonly
              disabled
              placeholder="Creation Date"
              class="input-disabled"
              :value="getDateObject(new Date())"
            />
          </span>
        </div>
      </v-card-text>
      <p class="text-error" style="padding: 0 24px;">{{messEror}}</p>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="btnCancelClick"
          class="
            buton-secondary
            button-size
            border-width-2px
            text-transform-unset
            mr-4
            font-size-18
          "
        >
          Cancel
        </v-btn>
        <v-btn
          text
          @click="btnSubmitClick"
          class="buton-primary button-size text-transform-unset font-size-18"
          :loading="loadingBtn"
        >
          {{ Object.keys(selectedData).length ? "Update" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted,toRef, ref,watch } from "@vue/composition-api";
//  import { tDate } from "validation_t/src";
import api from "@/services";
export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    selectedData: {
      type: Object,
      default: {},
    },
    handlerCancel: {
      type: Function,
    },
    handlerSubmit: {
      type: Function,
    },
     loadingBtn:{
      type: Boolean,
      default:false,
    },
    messEror:{
      type: String,
    }
  },
  setup: (props, ctx) => {
    let dataDefault: Record<string, any> | undefined = toRef(props, "selectedData");
    const getDateObject = (_date:any)=>{
      // let date = tDate.formatDateCustomize(_date);
      // return `${date.yyyy}-${date.MM}-${date.dd}`;
      return _date;
    };
    let formData = ref<Record<string, any>>({});
    watch(dataDefault,currentValue=>{
        formData.value = {...currentValue};
    })
     const setDataFormValue = (payload: Record<string,any>) => {
      formData.value = {
        ...formData.value,
        ...payload
      };
    };
    let listProfile = ref<Record<string,unknown>[]>([]);
    let listCompany = ref<Record<string,unknown>[]>([]);
    const setlistProfileData = (payload:Record<string,unknown>[])=>{
      listProfile.value = payload
    }
    const setlistCompanyData = (payload:Record<string,unknown>[])=>{
      listCompany.value = payload
    }
    const btnCancelClick = () => {
      ctx.emit("handlerCancel");
    };
    const btnSubmitClick = () => {
      ctx.emit("handlerSubmit", formData.value);
    };
    const handerSelecChange = (val:any,feild:string)=>{
     let _obj:Record<string, unknown> = {}
     _obj[`${feild}`] = val
     setDataFormValue(_obj)
     
    }
    const getAllAgency = async () => {
      const res = await api.agency.getAll();
      if (!res) {
        return;
      }
      try {
        if(res.status > 199 && res.status < 399 ){
          setlistProfileData(res.data.data.agencies);
        }
      
      } catch (error) {
      console.log(error);
      }
    
    };
    // const getAllCompany = async () => {
    //   const res = await api.agency.getAll();
    //   if (!res) {
    //     return;
    //   }
    //   try {
    //     if(res.status > 199 && res.status < 399 ){
    //       setlistCompanyData(res.data.data.company);
    //     }
      
    //   } catch (error) {
    //   console.log(error);
    //   }
    
    // };
    onMounted(getAllAgency)
    return {
      formData,
      listProfile,
      listCompany,
      btnCancelClick,
      getDateObject,
      btnSubmitClick,
      handerSelecChange
    };
  },
  methods: {
    
  },
 
});
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.v-dialog .dialog-user {
  border-radius: 14px;
  padding: 35px 35px;
  & > .v-card__title {
    padding-top: 0 !important;
    padding-bottom: 60px !important;
    font-size: 32px !important;
    color: $primaryBlack;
    font-weight: 700 !important;
  }
  .form-list {
    height: 565px;
    overflow: hidden;
    overflow-y: scroll;
    padding: 0 24px;
    margin-bottom: 30px;
    .form-item {
      display: flex;
      align-items: center;
      .form-lable {
        width: 35%;
        color: $primaryLabel;
        font-size: 14px;
      }
      .form-input {
        width: 65%;
        &>input {
          width: 100%;
          background: #ffffff;
          border: 0.6px solid #d5d5d5;
          box-sizing: border-box;
          border-radius: 4px;
          height: 52px;
          font-size: 16px;
          font-weight: 400;
          color: $GPEinputText;
          outline: unset;
          padding: 0 20px;
          &::placeholder {
            color: $GPEinputText;
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
              padding: 0 12px;
              &::placeholder {
                color: $GPEinputText;
              }
            }
          }
          fieldset,.v-text-field__details{
            display: none;
          }
        }
        
      }
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
  }

  .border-width-2px {
    border-width: 2px !important;
  }
}
.button-size {
  height: 56px !important;
  padding: 0 60px !important;
  border-radius: 12px;
}
</style>
