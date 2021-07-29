<template>
  <v-dialog v-model="isVisible" persistent max-width="80vw">
    <v-card class="dialog-consignee-detail">
      <v-card-title class="text-h5"> Packages of Consignee </v-card-title>
      <v-card-text class="">
        <div class="box-top mb-4 col-xxl-12">
          <div class="row my-0">
            <div class="col-xxl-6 mb-3">
              <div class="row my-0 detail-data display-flex align-center">
                <span class="col-xxl-5"> Company </span>
                <span class="col-xxl-7">
                  <input type="text" v-model="formData.company" disabled class="w-100" />
                </span>
              </div>
            </div>
            <div class="col-xxl-6 mb-3">
              <div class="row my-0 detail-data display-flex align-center">
                <span class="col-xxl-5"> Phone Number </span>
                <span class="col-xxl-7">
                  <input type="text" v-model="formData.phone" disabled class="w-100" />
                </span>
              </div>
            </div>
            <div class="col-xxl-6 mb-3">
              <div class="row my-0 detail-data display-flex align-center">
                <span class="col-xxl-5"> Contact Person </span>
                <span class="col-xxl-7">
                  <input type="text" v-model="formData.name" disabled class="w-100" />
                </span>
              </div>
            </div>
            <div class="col-xxl-6 mb-3">
              <div class="row my-0 detail-data display-flex align-center">
                <span class="col-xxl-5"> Email </span>
                <span class="col-xxl-7">
                  <input type="text" v-model="formData.email" disabled class="w-100" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <TableConsigneeDetail
          :table-data="tableData"
          :table-loading="loadingTable"
          :headers="headers"
        />
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
          Close
        </v-btn>
        <!-- <v-btn
                text
                @click="btnSubmitClick"
                class="buton-primary button-size text-transform-unset"
                >
                    {{Object.keys(selectedData).length?"Update":"Create"}}
                </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "@vue/composition-api";
import TableConsigneeDetail from "@/components/Table/TableConsigneeDetail.vue";
import api from "@/services";
import { NormalHeaderItem } from "@/InterfaceModel/Header";
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
    }
  },
  components: {
    TableConsigneeDetail,
  },
  setup: (props, ctx) => {
    let tableData = reactive<Record<string, unknown>>({ value: [] });
    const loadingTable = ref<boolean>(true);
    const btnCancelClick = () => {
      ctx.emit("handlerCancel");
    };
    const btnSubmitClick = () => {
      console.log("aaaaaaaaaaaa");
    };
    const headers: NormalHeaderItem[] = [
      {
        text: "Order Number",
        align: "start",
        sortable: false,
        value: "mawb",
        type: "string",
        filters: {
          // type: "string",
          // key: "mawb",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Package Number",
        align: "start",
        sortable: false,
        value: "mawb",
        type: "string",
        filters: {
          // type: "string",
          // key: "mawb",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Item Details",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: " Weight.",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Sender",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Address",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Tel No.",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      {
        text: "Status",
        align: "start",
        sortable: false,
        value: "v-value",
        type: "string",
        filters: {
          // type: "string",
          // key: "v-value",
          // placeholder: "Tên bộ lọc",
          // defaultValue: "",
        },
      },
      // { text: "Actions", value: "actions", sortable: false,filters:{} },
    ];
    const setTableData = (payload: Record<string, unknown>[]) => {
      tableData.value = payload;
    };
    const setLoadingTable = (payload: boolean) => {
      loadingTable.value = payload;
    };
    let formData = ref<Record<string, any>>({});
    const getAllData = async (query: Record<string, unknown>) => {
      const res = await api.consignee.getConsigneeDetail(query);
      setLoadingTable(false);
      if (!res) {
        return;
      }
      try {
        // const pagination = res.data.meta.pagination;
        // setTableData(res.data.data.consignee);
        //  setPagination({
        //   total: pagination.total,
        //   total_pages: pagination.total_pages,
        //   per_page: pagination.per_page,
        //   current_page: pagination.current_page,
        //  });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      headers,
      formData,
      loadingTable,
      tableData,
      btnCancelClick,
      btnSubmitClick,
      getAllData,
    };
  },
  methods: {},
  watch: {
    selectedData(){
      this.formData = this.selectedData;
      console.log(this.formData)
    },
    isVisible(_newVal) {
      if (_newVal) {
        if (this.selectedData.id) {
          const _id = this.selectedData.id;
          this.getAllData(_id);
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/style/_variables.scss";
.v-dialog .dialog-consignee-detail {
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
      input {
        border: 0.6px solid #d5d5d5;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 14px;
        color: $GPEdetailData;
        height: 32px;
        outline: none;
        padding: 0 15px;
        &::placeholder {
          font-size: 14px;
          color: $GPEdetailData;
        }
        &:disabled {
          background-color: #fafafa;
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
