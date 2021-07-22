<template>
  <v-dialog v-model="isVisible" persistent max-width="590">
    <v-card class="dialog-bag-manifest">
      <v-card-title class="text-h5">
        Create new Manifest
      </v-card-title>
      <v-card-text>
        <div class="form-item mb-5">
          <span class="form-lable"> MAWB No. </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="MAWB No."
              v-model="formData.mawb"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Destination </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Destination"
              v-model="formData.destination"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Flight No. </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Flight No."
              v-model="formData.flight"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Remark </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="Remark"
              v-model="formData.remark"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> CD No </span>
          <span class="form-input">
            <input
              type="text"
              placeholder="CD No"
              v-model="formData.cd"
            />
          </span>
        </div>
        <div class="form-item mb-5">
          <span class="form-lable"> Flight Date </span>
          <span class="form-input">
            <input type="date" v-model="formData.creationDate" />
          </span>
        </div>
        <div class="form-item">
          <span class="form-lable"> Time </span>
          <span class="form-input">
            <input type="time" v-model="formData.creationTime" />
          </span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="handleCloseCreate"
          class="buton-secondary button-size border-width-2px mr-4 text-transform-unset"
        >
          Cancel
        </v-btn>
        <v-btn text @click="btnSubmitClick" class="buton-primary button-size text-transform-unset">
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
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
    handleCloseCreate: {
      type: Function,
    },
    handlerSubmit: {
      type: Function,
    },
  },
  setup: (props, ctx) => {
    let formData = ref<Record<string, any>>({});
    const btnSubmitClick = () => {
      ctx.emit("handlerSubmit", formData.value);
    };
    return {
      formData,
      btnSubmitClick,
    };
  },
  methods: {},
});
</script>

<style lang="scss">
.v-dialog .dialog-bag-manifest {
  border-radius: 14px;
  padding: 35px 35px;
  & > .v-card__title {
    padding-top: 0 !important;
    padding-bottom: 60px !important;
    font-size: 32px !important;
    color: #202224;
    font-weight: 700 !important;
  }
  .form-item {
    display: flex;
    align-items: center;
    .form-lable {
      width: 35%;
      color: #606060;
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
        color: #2e2e2e;
        outline: unset;
        padding: 0 20px;
        &::placeholder {
          color: #2e2e2e;
        }
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
