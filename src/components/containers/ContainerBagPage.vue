<template>
 <div class="page-container">
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
    <v-btn @click="isVisible = true" class="buton-primary-header text-transform-unset mr-4 border-radius-8">
     <img src="@/assets/images/plus-composer.png" class="mr-2" />
     Create
    </v-btn>
    <v-btn class="buton-secondary-header text-transform-unset border-radius-8">
     <img src="@/assets/images/export-b.png" class="mr-2" />
     Export
    </v-btn>
   </div>
   <TableBag
    :table-data="tableData"
    :table-loading="loadingTable"
    :headers="headers"
    @handleFilterChange="filterTableChange"
    @handleSelectedItem="handlerEdit"
    @handleRemoveItem="handlerRemove"
    :current-binding-url="queryRoute"
   />
   <div class="pt-1">
    <SharedPagination :pagination-sync="pagination" @handlePageSizeChange="pagePaginationChange" @handlePageChange="pagePaginationChange" />
   </div>
   <DialogBag 
    :is-visible="isVisible" 
    :selected-data="selectedData" 
    @handlerCancel="handlerDialogCancel" 
    @handlerSubmit="handlerDialogSubmit" 
   />
   <ConfirmRemove
      :is-visible="isVisibleConfirm"
      :handlerCancel="handlerDialogConfirmCancel"
      :handlerConfirm="handleConfirmRemoveItem"
      :loading-btn="loadingBtn"
      title="Bag"
      :messErr="messageErr"
    >
    </ConfirmRemove>
  </div>
 </div>
</template>

<script lang="ts">
 import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import TableBag from "@/components/Table/TableBag.vue";
 import DialogBag from "@/components/Form/DialogBag.vue";
 import { SharedPagination } from "@/components/Shared";
 import { NormalPagination } from "@/InterfaceModel/Pagination";
 import { NormalHeaderItem } from "@/InterfaceModel/Header";
 import { IdentifyObject } from "@/InterfaceModel/CustomObject";
 import useRouteQuery from "@/utils/uses/routerQuery/useRouteQuery";
  import ConfirmRemove from "@/components/popup/ConfirmRemove.vue";
 import route from "@/router/index";
 import { mapState } from "vuex";
 import { filter } from "vue/types/umd";
 export default defineComponent({
  components: {
   TableBag,
   SharedPagination,
   DialogBag,
   ConfirmRemove
  },
  setup: (props,ctx) => {
   const { queryRoute, stringQueryRender, getQueryRoute } = useRouteQuery();
   let selectedData = reactive<Record<string, unknown>>({});
   const loadingTable = ref<boolean>(true);
   const currentRouteQuery = ref<string>(stringQueryRender);
   let tableData = reactive<Record<string, unknown>>({ value: [] });
   let filterTable = ref({});
  const messageErr = ref<string>("");
  const loadingBtn = ref<boolean>(false);  
  const isVisible = ref<boolean>(false);  
  const isVisibleConfirm = ref<boolean>(false);  
   let pagination = ref<NormalPagination>({
    total: 1,
    per_page: 15,
    total_pages: 15,
    current_page: 1,
   });

   const headers: NormalHeaderItem[] = [
    {
     text: "Bag Number",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {
      type: "string",
      key: "mawb",
      placeholder: "Bag Number",
      defaultValue: "",
     },
    },
    {
     text: "Create Date",
     value: "fat",
     type: "date",
     filters: {
      type: "daterange",
      key: "fat",
      placeholder: "Date",
      defaultValue: {},
      hasKey: true,
     },
    },
    {
     text: "Total Package",
     value: "carbs",
     type: "string",
     filters: {},
    },
    {
     text: "Status",
     value: "calories",
     type: "string",
     filters: {
      type: "select",
      key: "calories",
      placeholder: "Status",
      items: [
       {
        id: 1,
        name: "Lựa chọn 1",
       },
       {
        id: 2,
        name: "Lựa chọn 2",
       },
       {
        id: 3,
        name: "Lựa chọn 3",
       },
      ],
      defaultValue: "",
     },
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
    const setIsVisibleConfirm = (payload: boolean) => {
      isVisibleConfirm.value = payload;
    };
  const setLoadingBtn = (payload: boolean) => {
      loadingBtn.value = payload;
  };
  const setIsVisible = (payload: boolean) => {
    isVisible.value = payload;
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
   watch(isVisibleConfirm, currentValue => {
    if(!currentValue){
      messageErr.value = ""
    }
   });
    watch(isVisible, currentValue => {
      if(!currentValue){
        messageErr.value = ""
      }
    });

   const getAllBag = async (query: Record<string, unknown>) => {
    if(!Object.keys(query).length) return;
    const res = await api.bag.getAll(query);
    setLoadingTable(false);
    if (!res) {
     return;
    }
    try {
     const pagination = res.data.data.meta.pagination;
     setTableData(res.data.data.senders);
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
   const createBag = async (parrams: Record<string, unknown>) => {
      messageErr.value = "";
      setLoadingBtn(true);
      const res = await api.senders.create(parrams);
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
        if (res.status > 199 && res.status < 399) {
          let _data = res.data.data.sender;

          setIsVisible(false);
          ctx.root.$store.commit("SET_SNACKBAR", {
            type: "success",
            title: "",
            content: "Create success",
          });
        } else {
          messageErr.value = res.data.data.error || res.data.message;
          ctx.root.$store.commit("SET_SNACKBAR", {
            type: "error",
            title: "",
            content: "Create error",
          });
        }
      } catch (error) {
        messageErr.value = error;
        ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Create error",
        });
      }
    };
   const updateBag = async (parrams: Record<string, unknown>, _id: any) => {
      messageErr.value = "";
      setLoadingBtn(true);
      const res = await api.senders.update(parrams, _id);
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
        if (res.status > 199 && res.status < 399) {
          setIsVisible(false);
          ctx.root.$store.commit("SET_SNACKBAR", {
            type: "success",
            title: "",
            content: "Update success",
          });
        } else {
          messageErr.value = res.data.data.error;
          ctx.root.$store.commit("SET_SNACKBAR", {
            type: "error",
            title: "",
            content: "Update error",
          });
        }
      } catch (error) {
        messageErr.value = error;
        ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Update error",
        });
      }
    };
    const deleteBag = async (_id: any) => {
      setLoadingBtn(true);
      const res = await api.senders.delete(_id);
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
          setIsVisible(false)
          ctx.root.$store.commit("SET_SNACKBAR", {
              type: "success",
              title: "",
              content: "Update success",
          });
            
          
        }
        else{
          messageErr.value = res.data.data.error
          ctx.root.$store.commit("SET_SNACKBAR", {
              type: "error",
              title: "",
              content: "Update error",
          });
        }
      } catch (error) {
        messageErr.value = error
        ctx.root.$store.commit("SET_SNACKBAR", {
              type: "error",
              title: "",
              content: "Update error",
          });
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
    isVisible,
    isVisibleConfirm,
    messageErr,
    currentRouteQuery,
    loadingBtn,
    setTableData,
    setLoadingTable,
    setCurrentRouteQuery,
    setPagination,
    getAllBag,
    setCurrentFilterTable,
    setIsVisible,
    setIsVisibleConfirm,
    deleteBag
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
   this.getAllBag({ ...this.queryRoute });
  },
  methods: {
   handlerDialogCancel() {
    this.isVisible = false;
   },
   handlerDialogSubmit(value: any) {
    console.log(value);
   },
  handlerDialogConfirmCancel() {
    this.setIsVisibleConfirm(false);
  },
  handleConfirmRemoveItem(item: Record<string, unknown>) {
    const id = this.selectedData.id;
    this.deleteBag(id);
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
      this.setIsVisible(true);
      this.selectedData = { ...item };
  },
  handlerRemove(item: Record<string, unknown>) {
    this.setIsVisibleConfirm(true);
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
