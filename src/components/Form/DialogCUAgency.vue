<template>
  <v-dialog v-model="isVisible" persistent max-width="750">
    <v-card class="dialog-agency">
      <v-card-title class="text-h5">
        <span v-if="Object.keys(selectedData).length">
          Update Agency Infomation:
          <span class="text-uppercase text-primary-color">{{
            selectedData.contact_person ? selectedData.contact_person : ""
          }}</span>
        </span>
        <span v-else> Create new Agency </span>
      </v-card-title>
      <v-card-text class="form-list scrollbar-y">
        <div class="form-item mb-5">
          <span class="form-lable"> Company </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Company"
              v-model="formData.name"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Contact Person </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Contact Person"
              v-model="formData.contact_person"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Code </span>
          <span class="form-input">
            <input
              type="number"
              placeholder="Code"
              v-model="formData.agency_code"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Reminiscent Name </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Reminiscent Name"
              v-model="formData.contact_person"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Address </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Address"
              v-model="formData.address"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> State </span>
          <span class="form-input">
            <input type="text" placeholder="State" v-model="formData.state" />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Country </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Country"
              v-model="formData.country"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Post Code </span>
          <span class="form-input">
            <input
              type="number"
              placeholder="Post Code"
              v-model="formData.post_code"
            />
          </span>
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
            <input type="text" placeholder="Email" v-model="formData.email" />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> VAT </span>
          <span class="form-input">
            <input type="text" placeholder="VAT" v-model="formData.tax_code" />
          </span>
        </div>
        <!-- <div class="form-item ">
                    <span class="form-lable">
                        Creation Date
                    </span>
                    <span class="form-input">
                        <input type="date" v-model="formData.creationDate">
                    </span>
                </div> -->
      </v-card-text>
      <p class="text-error" style="padding: 0 24px">{{ messEror }}</p>
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
          "
        >
          Cancel
        </v-btn>
        <v-btn
          text
          @click="btnSubmitClick"
          class="buton-primary button-size text-transform-unset"
          :loading="loadingBtn"
        >
          {{ Object.keys(selectedData).length ? "Update" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from "@vue/composition-api";
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
    loadingBtn: {
      type: Boolean,
      default: false,
    },
    messEror: {
      type: String,
    },
  },
  setup: (props, ctx) => {
    let dataDefault: Record<string, any> | undefined = toRef(
      props,
      "selectedData"
    );
    let formData = ref<Record<string, any>>({});
    const btnCancelClick = () => {
      ctx.emit("handlerCancel");
    };
    const btnSubmitClick = () => {
      ctx.emit("handlerSubmit", formData.value);
    };
    watch(dataDefault, (currentValue) => {
      formData.value = { ...currentValue };
    });
    return {
      formData,
      btnCancelClick,
      btnSubmitClick,
    };
  },
  methods: {},
});
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.v-dialog .dialog-agency {
  border-radius: 14px;
  padding: 35px 35px;
  & > .v-card__title {
    padding-top: 0 !important;
    padding-bottom: 50px !important;
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
        input {
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
