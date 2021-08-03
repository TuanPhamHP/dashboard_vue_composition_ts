<template>
  <div class="container-order-package">
    <div class="mb-4">
    <!-- <v-btn @click="setupData" class="">Setup Data</v-btn> -->
    <v-btn @click="isVisible = true" class="buton-primary-header text-transform-unset mr-4 border-radius-8">
     <img src="@/assets/images/plus-composer.png" class="mr-2" />
     Add New Package
    </v-btn>
    <v-btn class="buton-secondary-header text-transform-unset border-radius-8">
     <img src="@/assets/images/icon-print.svg" class="mr-2" />
     Print
    </v-btn>
   </div>
   <TablePackage
    :table-data="tableData"
    :table-loading="loadingTable"
    :headers="headers"
    @handleFilterChange="filterTableChange"
    @handleSelectedItem="handlerEdit"
    :current-binding-url="queryRoute"
   />
   <DialogPackage
    :is-visible="isVisible"
    :selected-data="selectedData"
    @handlerCancel="handlerDialogCancel"
    @handlerSubmit="handlerDialogSubmit"
    :loading-btn="loadingBtn"
    :mess-eror="messageErr"
  />
  </div>
</template>

<script lang="ts">
 import { defineComponent, onMounted, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import TablePackage from "@/components/Table/TablePackage.vue";
 import DialogPackage from "@/components/Form/order/DialogPackage.vue";
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
   TablePackage,
   SharedPagination,
   DialogPackage,
  },
  setup: props => {
   const { queryRoute, stringQueryRender, getQueryRoute,currentParram } = useRouteQuery();
   const currentID:number = currentParram;
   let selectedData = reactive<Record<string, unknown>>({});
   const loadingTable = ref<boolean>(false);
   const loadingBtn = ref<boolean>(false);
   const isVisible = ref<boolean>(false);
   const isVisibleDetail = ref<boolean>(false);
   const isVisibleConfirm = ref<boolean>(false);
   const currentRouteQuery = ref<string>(stringQueryRender);
   const messageErr = ref<string>("");
   let tableData = reactive<Record<string, unknown>>({ value: [{
      status:'aaaaaaaaa',
      mawb:1111111111111
   }] });
   let filterTable = ref({});
   let pagination = ref<NormalPagination>({
    total: 1,
    per_page: 15,
    total_pages: 15,
    current_page: 1,
   });

   const headers: NormalHeaderItem[] = [
    {
     text: "Status",
     align: "start",
     sortable: false,
     value: "status",
     type: "string",
     filters: {},
    },
    {
     text: "MAWB",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: "Bag Number",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: "Package Number",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: "Draft ID",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
     {
     text: "Package Type",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
     {
     text: "Item Details",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: " Weight (kg)",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: " Volume",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: " Length (cm)",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
     {
     text: " Width (cm)",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {},
    },
     {
     text: " Height (cm)",
     align: "start",
     sortable: false,
     value: "mawb",
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
    const setLoadingBtn = (payload: boolean) => {
    loadingBtn.value = payload;
   };
    const setIsVisible = (payload: boolean) => {
      isVisible.value = payload;
    };
    const setIsVisibleDetail = (payload: boolean) => {
      isVisibleDetail.value = payload;
    };
    const setIsVisibleConfirm = (payload: boolean) => {
      isVisibleConfirm.value = payload;
    };
   watch(currentRouteQuery, currentValue => {
    route.push(`${currentValue}`);
   });
   watch(pagination, currentValue => {
    const { current_page, per_page } = currentValue;
    setCurrentRouteQuery({
     ...queryRoute,
     current_page,
     per_page,
    });
   });

   watch(filterTable, currentValue => {
    setCurrentRouteQuery({
     ...queryRoute,
     ...currentValue,
    });
   });
   watch(isVisible, (currentValue) => {
      if (!currentValue) {
        selectedData.value = {};
         messageErr.value = ""
      }
    });
    watch(isVisibleDetail, (currentValue) => {
      if (!currentValue) {
        selectedData.value = {};
         messageErr.value = ""
      }
    });

   const getOrderPackage = async () => {
     console.log('getOrderPackage');
     
    // setLoadingTable(false);
    // const res = await api.roles.getAll(id);
    // setLoadingTable(false);
    // if (!res) {
    //  return;
    // }
    // try {
    //  const pagination = res.data.meta.pagination;
    //  setTableData(res.data.data);
    //  //  setPagination({
    //  //   total: pagination.total,
    //  //   total_pages: pagination.total_pages,
    //  //   per_page: pagination.per_page,
    //  //   current_page: pagination.current_page,
    //  //  });
    // } catch (error) {
    //  console.log(error);
    // }
   };
   onMounted(getOrderPackage)
   return {
    headers,
    isVisible,
    pagination,
    loadingTable,
    tableData,
    queryRoute,
    filterTable,
    selectedData,
    messageErr,
    loadingBtn,
    setTableData,
    setIsVisible,
    setIsVisibleConfirm,
    setIsVisibleDetail,
    setLoadingTable,
    setCurrentRouteQuery,
    setPagination,
    getOrderPackage,
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
  },
  computed: {
   ...mapState({
    previousPagination: (state: any) => state.previousPagination,
   }),
  },
  methods: {
    handlerDialogCancel() {
      this.setIsVisible(false);
    },
    handlerDialogItemCancel() {
      this.setIsVisibleDetail(false);
    },
    handlerDialogConfirmCancel() {
      this.setIsVisibleConfirm(false);
    },
    handleConfirmRemoveItem(item: Record<string, unknown>) {
      const id = this.selectedData.id;
      this.deleteSender(id);
    },
    handlerDialogSubmit(value: any) {
      if (Object.keys(this.selectedData).length) {
        const id = this.selectedData.id;
        this.updateSender(value, id);
      } else {
        this.createSender(value);
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
   bindingDefaultFilterHeader(_obj: Record<string, unknown>) {
    let _headers = this.headers.slice();
    const currentQuery: Record<string, unknown> = _obj;

    for (const _key in currentQuery) {
     let _keySplit = _key.split(".");

     if (_keySplit.length === 1) {
      let n = _headers.findIndex(o => o.filters.key === _key);
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
        _headers[n].filters.defaultValue = parseInt(`${currentQuery[_key]}`);
       }
      }
     } else {
      const _keyNew: string = _keySplit[1];
      let n = _headers.findIndex(o => o.filters.key === _keySplit[0]);
      if (n !== -1) {
       let obj = { ..._headers[n] };
       let objF = { ..._headers[n].filters };
       let defaultValue = typeof objF.defaultValue === "object" && { ...objF.defaultValue };
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

<style lang="scss"></style>
