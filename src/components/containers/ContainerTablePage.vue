<template>
 <div>
  <v-btn v-if="loadingTable" class="mb-3" v-click-outside="clearSetup">Add</v-btn>
  <v-btn @click="setupData" class="mb-3 mx-3">Setup Data</v-btn>
  <div class="px-3">
   <TableMultiSort :table-data="tableData" :table-loading="loadingTable" :headers="headers" @handleFilterChange="filterTableChange" :current-binding-url="queryRoute" />
   <div class="pt-1">
    <SharedPagination :pagination-sync="pagination" @handlePageSizeChange="pagePaginationChange" @handlePageChange="pagePaginationChange" />
   </div>
  </div>
 </div>
</template>

<script lang="ts">
 import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
 import api from "@/services";
 import TableMultiSort from "@/components/Table/TableMultiSort.vue";
 import { SharedPagination } from "@/components/Shared";
 import { NormalPagination } from "@/InterfaceModel/Pagination";
 import { IdentifyObject } from "@/InterfaceModel/CustomObject";
 import useRouteQuery from "@/utils/uses/routerQuery/useRouteQuery";
 import route from "@/router/index";
 export default defineComponent({
  components: {
   TableMultiSort,
   SharedPagination,
  },
  setup: props => {
   const { queryRoute, stringQueryRender, getQueryRoute } = useRouteQuery();
   const loadingTable = ref<boolean>(true);
   const currentRouteQuery = ref<string>(stringQueryRender);
   let tableData = reactive<Record<string, unknown>>({ value: [] });
   let filterTable = ref({})
   let pagination = ref<NormalPagination>({
    total: 1,
    per_page: 15,
    total_pages: 15,
    current_page: 1,
   });

   let headers = [
    {
     text: "Dessert (100g serving)",
     align: "start",
     sortable: false,
     value: "mawb",
     type: "string",
     filters: {
      type: "string",
      key: "mawb",
      placeholder: "Tên bộ lọc",
      defaultValue: "",
     },
    },
    {
     text: "Calories",
     value: "calories",
     type: "string",
     filters: {
      type: "select",
      key: "calories",
      placeholder: "Lọc select",
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
    {
     text: "Fat (g)",
     value: "fat",
     type: "date",
     filters: {
      type: "daterange",
      key: "fat",
      placeholder: "Tên bộ lọc",
      defaultValue: "",
     },
    },
    {
     text: "Carbs (g)",
     value: "carbs",
     type: "string",
     filters: {
      type: "string",
      key: "carbs",
      placeholder: "Tên bộ lọc",
      defaultValue: "",
     },
    },
    {
     text: "Protein (g)",
     value: "protein",
     type: "string",
     filters: {
      type: "string",
      key: "protein",
      placeholder: "Tên bộ lọc",
      defaultValue: "",
     },
    },
    {
     text: "Iron (%)",
     value: "iron",
     type: "string",
     filters: {
      type: "string",
      key: "iron",
      placeholder: "Tên bộ lọc",
      defaultValue: "",
     },
    },
    { text: "Actions", value: "actions", sortable: false },
   ];
   const setTableData = (payload: Record<string, unknown>[]) => {
    tableData.value = payload;
   };
   const setPagination = (payload: NormalPagination) => {
    pagination.value = { ...payload };
   };
   const setCurrentRouteQuery = (payload: Record<string, unknown>): any => {
    currentRouteQuery.value = getQueryRoute(payload);
   };
    const setCurrentFilterTable = (payload: Record<string, unknown>): any => {
      filterTable.value = {...payload}
    };
   const setLoadingTable = (payload: boolean) => {
    loadingTable.value = payload;
   };
   // Watch
   watch(currentRouteQuery, currentValue => {
    route.push(`${currentValue}`);
   });
   watch(pagination, currentValue => {
    const { current_page, per_page } = currentValue;
    setCurrentRouteQuery({ 
      ...queryRoute,
      current_page, 
      per_page 
      });
   });
   
   watch(filterTable,currentValue=>{
     setCurrentRouteQuery({
        ...queryRoute,
        ...currentValue
      });
   })

   const getAllRoles = async (query: Record<string, unknown>) => {
    const res = await api.roles.getAll(query);
    setLoadingTable(false);
    if (!res) {
     return;
    }
    try {
     const pagination = res.data.meta.pagination;
     setTableData(res.data.data);
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
    setTableData,
    setLoadingTable,
    setCurrentRouteQuery,
    setPagination,
    getAllRoles,
    setCurrentFilterTable,
   };
  },
  watch: {},
  created() {
    console.log('container-create',this.queryRoute);
    
   if (this.queryRoute.per_page) {
    const refPagination = { ...this.pagination };
    refPagination.per_page = +this.queryRoute.per_page;
    refPagination.current_page = +this.queryRoute.current_page;
    console.log(refPagination);
    this.setPagination(refPagination);
   }
   if (this.queryRoute) {
    let _obj:any =  {...this.queryRoute}
    delete _obj.per_page,
    delete _obj.current_page
    this.setCurrentFilterTable(_obj)

    this.setCurrentRouteQuery(this.queryRoute)
   }
  //  const page = this.pagination.current_page;
  //  const per_page = this.pagination.per_page;

   this.getAllRoles({ ...this.queryRoute });
  },
  methods: {
   pagePaginationChange(_val: any) {
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
    console.log("clicked");
    this.setLoadingTable(false);
   },
   filterTableChange(_val:any){
    let pairO = new IdentifyObject({
      ..._val
    });
    this.setCurrentFilterTable(pairO.identifySelf())
   }
  },
 });
</script>

<style></style>
