<template>
  <v-dialog v-model="isVisible" persistent max-width="740">
    <v-card class="dialog-user">
      <v-card-title class="text-h5">
        {{ Object.keys(selectedData).length ? "Update" : "Create" }} Sender
        Information
      </v-card-title>
      <v-card-text class="form-list scrollbar-y">
        <div class="form-item mb-5">
          <span class="form-lable"> Company </span>
          <span class="form-input">
            <input type="text" placeholder="Company" v-model="formData.company" />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Full Name </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Full Name"
              v-model="formData.full_name"
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
          ></v-select>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Phone Number </span>
          <span class="form-input">
            <input
              type="number"
              placeholder="Phone Number"
              v-model="formData.phone_number"
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
            <input type="text" placeholder="Password" v-model="formData.password" />
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
        >
          {{ Object.keys(selectedData).length ? "Update" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
//  import { tDate } from "validation_t/src";
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
  },
  setup: (props, ctx) => {
    const getDateObject = (_date:any)=>{
      // let date = tDate.formatDateCustomize(_date);
      // return `${date.yyyy}-${date.MM}-${date.dd}`;
      return _date;
    };
    let formData = ref<Record<string, any>>({
    });
    let listProfile = ref([]);
    const btnCancelClick = () => {
      ctx.emit("handlerCancel");
    };
    const btnSubmitClick = () => {
      ctx.emit("handlerSubmit", formData.value);
    };
    return {
      formData,
      listProfile,
      btnCancelClick,
      getDateObject,
      btnSubmitClick,
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
