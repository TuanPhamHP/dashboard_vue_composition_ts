<template>
 <div class="page-container">
  <div class="page-content">
   <div class="mb-7">
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
   <TableUser
    :table-data="tableData"
    :table-loading="loadingTable"
    :headers="headers"
    @handleFilterChange="filterTableChange"
    @handleSelectedItem="handlerEdit"
    @handleRemoveItem="handlerRemove"
    :current-binding-url="queryRoute"
    @handleSelectedItemDetail="handlerViewDetail"
   />
   <div class="pt-1">
    <SharedPagination :pagination-sync="pagination" @handlePageSizeChange="pagePaginationChange" @handlePageChange="pagePaginationChange" />
   </div>
   <DialogUser :is-visible="isVisible"              :selected-data="selectedData"     @handlerCancel="handlerDialogCancel"  @handlerSubmit="handlerDialogSubmit" 
    :loading-btn="loadingBtn" 
    :mess-eror="messageErr" 
   />
   <ConfirmRemove
      :is-visible="isVisibleConfirm"
      :handlerCancel="handlerDialogConfirmCancel"
      :handlerConfirm="handleConfirmRemoveItem"
      :loading-btn="loadingBtn" 
   >
   </ConfirmRemove>
  </div>
 </div>
</template>

<script lang="ts">
 import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import TableUser from "@/components/Table/TableUser.vue";
 import DialogUser from "@/components/Form/DialogUser.vue";
 import { SharedPagination } from "@/components/Shared";
 import { NormalPagination } from "@/InterfaceModel/Pagination";
 import { NormalHeaderItem } from "@/InterfaceModel/Header";
 import { IdentifyObject } from "@/InterfaceModel/CustomObject";
import ConfirmRemove from "@/components/popup/ConfirmRemove.vue";
 import useRouteQuery from "@/utils/uses/routerQuery/useRouteQuery";
 import route from "@/router/index";
 import { mapState } from "vuex";
 import { filter } from "vue/types/umd";
 export default defineComponent({
  components: {
   TableUser,
   SharedPagination,
   DialogUser,
   ConfirmRemove
  },
  setup: (props,ctx) => {
   const { queryRoute, stringQueryRender, getQueryRoute } = useRouteQuery();
   let selectedData = reactive<Record<string, unknown>>({});
   const loadingTable = ref<boolean>(true);
   const currentRouteQuery = ref<string>(stringQueryRender);
   let tableData = reactive<Record<string, unknown>>({ value: [] });
    const loadingBtn = ref<boolean>(false);
   const isVisible = ref<boolean>(false); 
   const isVisibleConfirm = ref<boolean>(false); 
   const isVisibleDetail = ref<boolean>(false);
   let filterTable = ref({});
   const messageErr = ref<string>("");
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
     value: "mawb",
     type: "string",
     filters: {},
    },
    {
     text: "Company",
     align: "start",
     sortable: false,
     value: "v-value",
     type: "string",
     filters: {},
    },
    {
     text: "Full Name",
     align: "start",
     sortable: false,
     value: "v-value",
     type: "string",
     filters: {},
    },
    {
     text: "Phone Number",
     align: "start",
     sortable: false,
     value: "v-value",
     type: "string",
     filters: {},
    },
    {
     text: "Email",
     align: "start",
     sortable: false,
     value: "v-value",
     type: "string",
     filters: {},
    },
    {
     text: "Password",
     align: "start",
     sortable: false,
     value: "v-value",
     type: "string",
     filters: {},
    },
    {
     text: "Creation Date",
     align: "start",
     sortable: false,
     value: "v-value",
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
   const setIsVisible = (payload: boolean) => {
    isVisible.value = payload;
   };
   const setIsVisibleDetail = (payload: boolean) => {
    isVisibleDetail.value = payload;
   };
   const setIsVisibleConfirm = (payload: boolean) => {
    isVisibleConfirm.value = payload;
   };
   const setLoadingBtn = (payload: boolean) => {
    loadingBtn.value = payload;
   };
   watch(currentRouteQuery, currentValue => {
    route.push(`${currentValue}`);
   });
   watch(isVisible, currentValue => {
    if(!currentValue){
      selectedData.value = {};
    }
  });
  watch(isVisibleDetail, currentValue => {
    if(!currentValue){
      selectedData.value = {};
    }
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
    console.log(currentValue);

    setCurrentRouteQuery({
     ...queryRoute,
     ...currentValue,
    });
   });

   const getAllUser = async (query: Record<string, unknown>) => {
    setLoadingTable(true);
    if(!Object.keys(query).length) return;
    const res = await api.users.getAll(query);
    setLoadingTable(false);
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
        const pagination = res.data.data.meta.pagination;
        setTableData(res.data.data.users);
        setPagination({
          total: pagination.total,
          total_pages: pagination.total_pages,
          per_page: pagination.per_page,
          current_page: pagination.current_page,
        });
      }
    
    } catch (error) {
     console.log(error);
    }
   };
   const createUser = async (parrams: Record<string, unknown>) => {
    setLoadingBtn(true);
    const res = await api.users.create(parrams);
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
        let _data =  res.data.data.User
        
        console.log(_data);
        console.log(tableData.value);
        // let arr:Record<string, unknown>[] = tableData.value
        // arr.push(_data)
        // console.log(arr);
        
        // setTableData
        setIsVisible(false)
        ctx.root.$store.commit("SET_SNACKBAR", {
            type: "success",
            title: "",
            content: "Create success",
        });
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
   const updateUser = async (parrams: Record<string, unknown>,_id:any) => {
    setLoadingBtn(true);
    const res = await api.users.update(parrams,_id);
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
   const deleteUser = async (_id:any) => {
    setLoadingBtn(true);
    const res = await api.users.delete(_id);
    setLoadingBtn(false);
    if (!res) {
     return;
    }
    try {
      if(res.status > 199 && res.status < 399 ){
        setIsVisibleConfirm(false)
        // this.$store.commit("SET_SNACKBAR", {
        //     type: "",
        //     title: "",
        //     content: "",
        // });
          
        
      }
      else{
        messageErr.value = res.data.data.error
      }
    } catch (error) {
      messageErr.value = error
    }
   };
   return {
    headers,
    pagination,
    loadingTable,
    loadingBtn,
    tableData,
    queryRoute,
    filterTable,
    selectedData,
    isVisible,
    isVisibleDetail,
    isVisibleConfirm,
    messageErr,
    setTableData,
    setLoadingTable,
    setIsVisible,
    setIsVisibleConfirm,
    setIsVisibleDetail,
    setCurrentRouteQuery,
    setPagination,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
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
   console.log("container-create", this.queryRoute);

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
   this. getAllUser({ ...this.queryRoute });
  },
  methods: {
   handlerDialogCancel() {
    this.setIsVisible(false);
   },
   handlerDialogItemCancel() {
    this.setIsVisibleDetail(false);
   },
    handlerDialogConfirmCancel(){
     this.setIsVisibleConfirm(false);
   },
   handleConfirmRemoveItem(item: Record<string, unknown>){
     const id  = this.selectedData.id
     this.deleteUser(id);
   },
   handlerDialogSubmit(value: any) {
    if(Object.keys(this.selectedData).length){
       const id = this.selectedData.id
      this.updateUser(value,id)
     }
     else{
      this.createUser(value)
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
    this.setIsVisible(true);
    this.selectedData = { ...item };
   },
   handlerRemove(item: Record<string, unknown>) {
    this.setIsVisibleConfirm(true);
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
