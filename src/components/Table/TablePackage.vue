<template>
 <v-data-table
  :headers="headers"
  :items="tableData.value"
  :sort-by="[]"
  :sort-desc="[false, true]"
  :hide-default-header="false"
  :height="tableHeight"
  multi-sort
  ref="tableMod"
  class="table-modify-css table-bag-model table-scroll-y header-sticky-table header-no-border-table"
  hide-default-footer
  :items-per-page="10000"
  :loading="tableLoading"
  loading-text="Loading... Please wait"
  :class="tableLoading ? 'table-on-loading' : ''"
 >
  <template v-slot:item.actions="{ item }">
   <div class="w-max-content">
    <!-- <v-icon small class="mr-2" > </v-icon> -->
    <v-tooltip bottom>
     <template v-slot:activator="{ on, attrs }">
      <img v-bind="attrs" v-on="on" @click="editItem(item)" class="pointer mr-2" src="@/assets/images/icon-edit.svg" alt="" />
     </template>
     <span>Edit</span>
    </v-tooltip>
    <v-tooltip bottom>
     <template v-slot:activator="{ on, attrs }">
      <img v-bind="attrs" v-on="on" @click="deleteItem(item)" class="pointer mr-2" src="@/assets/images/icon-remove-r.svg" alt="" />
     </template>
     <span>Delete</span>
    </v-tooltip>
    <v-tooltip bottom>
     <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" small @click="detailItem(item)"> mdi-eye </v-icon>
     </template>
     <span>View Detail</span>
    </v-tooltip>
   </div>
  </template>
 </v-data-table>
</template>

<script lang="ts">
 import Vue from "vue";
 import { ref, defineComponent, reactive, watch, toRefs } from "@vue/composition-api";
 import { TableFiltersInput, TableFiltersSelect, TableFiltersDateRange } from "@/components/Shared/index";
 import { NormalFilterObject } from "@/InterfaceModel/Filter";
 import { returnFilterObject } from "@/utils/TableFilters";
 export default defineComponent({
  props: {
   tableData: {
    type: Object,
    default: {},
   },
   tableLoading: {
    type: Boolean,
   },
   headers: {
    type: Array,
   },
   handleFilterChange: {
    type: Function,
   },
   currentBindingUrl: {
    type: Object,
   },
   handleSelectedItem: {
    type: Function,
   },
  },
  components: { TableFiltersInput, TableFiltersSelect, TableFiltersDateRange },
  setup: (props, ctx) => {
   const endedThead = ref<number>(40);
   const tableHeight = ref<number>(600);
   let filtersTable = ref<Record<string, unknown>>({});
   let selectedData = ref<Record<string, unknown>>({});

   const setEndedThead = (payload: number) => {
    endedThead.value = payload;
   };
   const setSelectedData = (payload: Record<string, unknown>) => {
    selectedData.value = payload;
    ctx.emit("handleSelectedItem", selectedData.value);
   };
   const setTableHeight = (payload: number) => {
    tableHeight.value = payload;
   };
   const setFiltersTable = (payload: Record<string, unknown>) => {
    filtersTable.value = payload;
   };
   watch(filtersTable, currentValue => {
    // reactive when filter change here
    ctx.emit("handleFilterChange", currentValue);
   });
   //  watch(selectedData, currentValue => {
   //   // reactive when filter change here
   //  });
   return {
    filtersTable,
    tableHeight,
    endedThead,
    selectedData,
    setEndedThead,
    setTableHeight,
    setFiltersTable,
    setSelectedData,
   };
  },
  data() {
   return {
    arraySort: [],
   };
  },
  mounted() {
   try {
    if (this.$refs.tableMod) {
     const myTable = (this.$refs.tableMod as Vue).$el as HTMLElement;
     const myThead = myTable.querySelector("thead");
     //  this.endedThead= myThead?.clientHeight
     if (myThead?.clientHeight) {
      this.setEndedThead(myThead.clientHeight);
     }
     this.setTableHeight(window.innerHeight - myTable.offsetTop - 80);
    }
   } catch (error) {
    console.log(error);
   }
  },

  methods: {
   listenChange(value: NormalFilterObject) {
    const valObject = returnFilterObject(value);
    const body = {
     ...this.filtersTable,
     ...valObject,
    };
    this.setFiltersTable(body);
   },
   listenDateChange(value: NormalFilterObject) {
    const valObject = { ...value };
    const body = {
     ...this.filtersTable,
     ...valObject,
    };
    this.setFiltersTable(body);
   },
   editItem(item: Record<string, string>) {
    this.setSelectedData(item);
   },
   detailItem(item: Record<string, string>) {
    const currentRoute = this.$route.fullPath;
    const id: any = item.id;
    const v = currentRoute.replaceAll("&", "mod=");
    
    this.$router.push({ path: `/bag/${id}`, query: { r_route: v } });
   },
  },
 });
</script>
<style lang="scss" scoped>
 //  .table-bag-model {
 //   width: 100% !important;
 //   border: 1px solid #e6e6e6;
 //   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
 //   border-collapse: collapse;
 //   .date-header {
 //    min-width: 200px;
 //   }
 //   .filter-prepend-body,
 //   .v-data-table-header {
 //    background-color: #dddddd;
 //   }
 //  }
</style>
<style lang="scss">
 //  .table-bag-model {
 //   .filter-prepend-body,
 //   .v-data-table-header {
 //    background-color: #dddddd !important;
 //   }
 //  }
 //  .filter-prepend-body {
 //   th,
 //   td {
 //    border-bottom: none !important;
 //   }
 //   border-bottom: none !important;
 //  }
</style>
