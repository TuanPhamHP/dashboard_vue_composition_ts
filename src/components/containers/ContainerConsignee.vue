<template>
  <div class="page-container-consignee">
    <!-- <div class=" mb-4 page-header">
    <span class="title-page font-size-32 font-weight-bold text-uppercase display-flex align-center">
      <span class="align-justify-center mr-4 pointer btn-back-page">
        <img src="@/assets/images/arrow-left.svg" alt="">
      </span>
      Bag List
    </span>
  </div> -->
    <div class="page-content">
      <div class="mb-4">
        <!-- <v-btn @click="setupData" class="">Setup Data</v-btn> -->
        <v-btn
          @click="isVisible = true"
          class="buton-primary-header text-transform-unset mr-4 border-radius-8"
        >
          <img src="@/assets/images/plus-composer.png" class="mr-2" />
          Create
        </v-btn>
        <v-btn
          class="buton-secondary-header text-transform-unset border-radius-8"
        >
          <img src="@/assets/images/export-b.png" class="mr-2" />
          Export
        </v-btn>
      </div>
      <TableConsignee
        :table-data="tableData"
        :table-loading="loadingTable"
        :headers="headers"
        @handleFilterChange="filterTableChange"
        @handleSelectedItem="handlerEdit"
        :current-binding-url="queryRoute"
        @handleSelectedItemDetail="handlerViewDetail"
      />
      <div class="pt-1">
        <SharedPagination
          :pagination-sync="pagination"
          @handlePageSizeChange="pagePaginationChange"
          @handlePageChange="pagePaginationChange"
        />
      </div>
      <DialogConsignee
        :is-visible="isVisible"
        :selected-data="selectedData"
        @handlerCancel="handlerDialogCancel"
        @handlerSubmit="handlerDialogSubmit"
      />
      <DialogConsigneeDetail
        :is-visible="isVisibleDetail"
        :selected-data="selectedData"
        @handlerCancel="handlerDialogItemCancel"
        @handlerSubmit="handlerDialogSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
import api from "@/services";
import TableConsignee from "@/components/Table/TableConsignee.vue";
import DialogConsignee from "@/components/Form/DialogConsignee.vue";
import DialogConsigneeDetail from "@/components/Form/DialogConsigneeDetail.vue";
import { SharedPagination } from "@/components/Shared";
import { NormalPagination } from "@/InterfaceModel/Pagination";
import { NormalHeaderItem } from "@/InterfaceModel/Header";
import { IdentifyObject } from "@/InterfaceModel/CustomObject";
import useRouteQuery from "@/utils/uses/routerQuery/useRouteQuery";
import route from "@/router/index";
import { mapState } from "vuex";
import { filter } from "vue/types/umd";
export default defineComponent({
  components: {
    TableConsignee,
    SharedPagination,
    DialogConsigneeDetail,
    DialogConsignee,
  },
  data() {
    return {
      isVisible: false,
      isVisibleDetail: false,
    };
  },
  setup: (props) => {
    const { queryRoute, stringQueryRender, getQueryRoute } = useRouteQuery();
    let selectedData = reactive<Record<string, unknown>>({});
    const loadingTable = ref<boolean>(true);
    const currentRouteQuery = ref<string>(stringQueryRender);
    let tableData = reactive<Record<string, unknown>>({ value: [] });
    let filterTable = ref({});
    let pagination = ref<NormalPagination>({
      total: 1,
      per_page: 15,
      total_pages: 15,
      current_page: 1,
    });

    const headers: NormalHeaderItem[] = [
      {
        text: "No.",
        align: "start",
        sortable: false,
        value: "id",
        type: "string",
        filters: {},
      },
      {
        text: "Company",
        align: "start",
        sortable: false,
        value: "company",
        type: "string",
        filters: {},
      },
      {
        text: "Contact Person",
        align: "start",
        sortable: false,
        value: "name",
        type: "string",
        filters: {},
      },
      {
        text: "Reminiscent Name",
        align: "start",
        sortable: false,
        value: "name",
        type: "string",
        filters: {},
      },
      {
        text: "ID No.",
        align: "start",
        sortable: false,
        value: "identity_code",
        type: "string",
        filters: {},
      },
      {
        text: "Address",
        align: "start",
        sortable: false,
        value: "address",
        type: "string",
        filters: {},
      },
      {
        text: "State",
        align: "start",
        sortable: false,
        value: "state",
        type: "string",
        filters: {},
      },
      {
        text: "Country",
        align: "start",
        sortable: false,
        value: "country",
        type: "string",
        filters: {},
      },
      {
        text: "Post Code",
        align: "start",
        sortable: false,
        value: "post_code",
        type: "string",
        filters: {},
      },
      {
        text: "Phone Number",
        align: "start",
        sortable: false,
        value: "phone",
        type: "string",
        filters: {},
      },
      {
        text: "Email",
        align: "start",
        sortable: false,
        value: "email",
        type: "string",
        filters: {},
      },
      {
        text: "VAT",
        align: "start",
        sortable: false,
        value: "tax_code",
        type: "string",
        filters: {},
      },
      { text: "Actions", value: "actions", sortable: false, filters: {} },
    ];
    Object.freeze(headers);
    const setTableData = (payload: Record<string, unknown>[]) => {
      tableData.value = payload;
    };
    const setPagination = (payload: NormalPagination) => {
      pagination.value = { ...payload };
    };
    const setCurrentRouteQuery = (payload: Record<string, unknown>): any => {
      let pairO = new IdentifyObject({
        ...payload,
      });
      currentRouteQuery.value = getQueryRoute(pairO.identifySelf());
    };
    const setCurrentFilterTable = (payload: Record<string, unknown>): any => {
      filterTable.value = { ...payload };
    };
    const setLoadingTable = (payload: boolean) => {
      loadingTable.value = payload;
    };

    watch(currentRouteQuery, (currentValue) => {
      route.push(`${currentValue}`);
    });
    watch(pagination, (currentValue) => {
      const { current_page, per_page } = currentValue;
      setCurrentRouteQuery({
        ...queryRoute,
        current_page,
        per_page,
      });
    });

    watch(filterTable, (currentValue) => {
      setCurrentRouteQuery({
        ...queryRoute,
        ...currentValue,
      });
    });

    const getAllRoles = async (query: Record<string, unknown>) => {
      const res = await api.roles.getAllConsignee(query);
      setLoadingTable(false);
      if (!res) {
        return;
      }
      try {
        // const pagination = res.data.meta.pagination;
        setTableData(res.data.data.consignees);
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
      pagination,
      loadingTable,
      tableData,
      queryRoute,
      filterTable,
      selectedData,
      setTableData,
      setLoadingTable,
      setCurrentRouteQuery,
      setPagination,
      getAllRoles,
      setCurrentFilterTable,
      currentRouteQuery,
    };
  },
  watch: {
    isVisible(_newVal) {
      if (!_newVal) {
        this.selectedData = {};
      }
    },
    isVisibleDetail(_newVal) {
      if (!_newVal) {
        this.selectedData = {};
      }
    },
  },
  computed: {
    ...mapState({
      previousPagination: (state: any) => state.previousPagination,
    }),
  },
  created() {
    if (this.previousPagination) {
      const body = {
        ...this.previousPagination,
      };
      this.setPagination(body);
    }
    if (this.queryRoute) {
      if (this.queryRoute.per_page) {
        const refPagination = { ...this.pagination };
        refPagination.per_page = +this.queryRoute.per_page;
        refPagination.current_page = +this.queryRoute.current_page;
        this.setPagination(refPagination);
      }
      let _obj: any = { ...this.queryRoute };
      delete _obj.per_page, delete _obj.current_page;
      // this.setCurrentFilterTable(_obj)

      // this.setCurrentRouteQuery(this.queryRoute)
      this.bindingDefaultFilterHeader(_obj);
    }
    this.getAllRoles({ ...this.queryRoute });
  },
  methods: {
    handlerDialogCancel() {
      this.isVisible = false;
    },
    handlerDialogItemCancel() {
      this.isVisibleDetail = false;
    },
    async handlerDialogSubmit(value: any) {
      const res = await api.roles.createConsignee(value);
      this.setLoadingTable(false);
      if (!res) {
        return;
      }
      try {
        const pagination = res.data.meta.pagination;
        this.setTableData(res.data.data);
        //  setPagination({
        //   total: pagination.total,
        //   total_pages: pagination.total_pages,
        //   per_page: pagination.per_page,
        //   current_page: pagination.current_page,
        //  });
      } catch (error) {
        console.log(error);
      }
    },
    pagePaginationChange(_val: any) {
      this.$store.commit("CACHED_PAGINATION", {
        total: this.pagination.total,
        total_pages: this.pagination.total_pages,
        per_page: _val.per_page,
        current_page: _val.page,
      });
      this.setPagination({
        total: this.pagination.total,
        total_pages: this.pagination.total_pages,
        per_page: _val.per_page,
        current_page: _val.page,
      });
    },
    setupData() {
      this.setLoadingTable(true);
    },
    clearSetup() {
      this.setLoadingTable(true);
    },
    filterTableChange(_val: any) {
      this.setCurrentFilterTable(_val);
    },
    handlerEdit(item: Record<string, unknown>) {
      this.isVisible = true;
      this.selectedData = { ...item };
    },
    handlerViewDetail(item: Record<string, unknown>) {
      this.isVisibleDetail = true;
      this.selectedData = { ...item };
    },
    bindingDefaultFilterHeader(_obj: Record<string, unknown>) {
      let _headers = this.headers.slice();
      const currentQuery: Record<string, unknown> = _obj;

      for (const _key in currentQuery) {
        let _keySplit = _key.split(".");

        if (_keySplit.length === 1) {
          let n = _headers.findIndex((o) => o.filters.key === _key);
          if (n !== -1) {
            //  const currentQuery = {..._headers[n]}
            //  const currentQueryF = {..._headers[n].filters}
            //  currentQueryF.defaultValue = currentQuery[_key]
            //  currentQuery.filters = {...currentQueryF}
            //  _headers.splice(n,1,currentQuery)
            if (_headers[n].filters.type === "string") {
              _headers[n].filters.defaultValue = `${currentQuery[_key]}`;
            } else if (_headers[n].filters.type === "select") {
              // _headers[n].filters.defaultValue = _headers[n].filters.items.find(o=>o.id === currentQuery[_key]);
              _headers[n].filters.defaultValue = parseInt(
                `${currentQuery[_key]}`
              );
            }
          }
        } else {
          const _keyNew: string = _keySplit[1];
          let n = _headers.findIndex((o) => o.filters.key === _keySplit[0]);
          if (n !== -1) {
            let obj = { ..._headers[n] };
            let objF = { ..._headers[n].filters };
            let defaultValue = typeof objF.defaultValue === "object" && {
              ...objF.defaultValue,
            };
            obj.filters.defaultValue = {
              ...defaultValue,
            };
            obj.filters.defaultValue[`${_keyNew}`] = currentQuery[`${_key}`];
            _headers.splice(n, 1, obj);
          }
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
.page-container-consignee {
  padding: 18px 18px 0;
  .page-content {
    padding: 30px;
    background: $primaryWhite;
    box-sizing: border-box;
    border-radius: 14px;
  }
  .btn-back-page {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $primaryWhite
  }
}
</style>
