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
  class="table-modify-css table-multi-sort-model table-scroll-y header-sticky-table header-no-border-table"
  hide-default-footer
  :items-per-page="10000"
  :loading="tableLoading"
  loading-text="Loading... Please wait"
  :class="tableLoading ? 'table-on-loading' : ''"
 >
  <template v-slot:body.prepend="{ headers }">
   <tr class="filter-prepend-body" :style="`top:${endedThead}px;position:sticky;z-index:3`">
    <td v-for="header in headers" :key="header.text" class="pointer" :class="header.type === 'date' ? 'date-header' : ''">
     <div>
      <TableFiltersInput
       v-if="header.filters && header.filters.type === 'string'"
       :own-header="header"
       :listen-change="listenChange"
       :default-value="header.filters.defaultValue"
      />
      <TableFiltersSelect
       v-if="header.filters && header.filters.type === 'select'"
       :own-header="header"
       :listen-change="listenChange"
       :default-value="header.filters.defaultValue"
      />
      <TableFiltersDateRange
       v-if="header.filters && header.filters.type === 'daterange'"
       :own-header="header"
       :listen-change="listenDateChange"
       :default-value="header.filters.defaultValue"
      />
     </div>
    </td>
   </tr>
  </template>
  <!-- <template v-if="tableLoading" v-slot:item>
   <tr>
    <td colspan="999">i'm loading</td>
   </tr>
  </template> -->
  <template v-slot:item.actions="{ item }">
   <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
   <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
  },
  components: { TableFiltersInput, TableFiltersSelect, TableFiltersDateRange },
  setup: (props, ctx) => {
   const endedThead = ref<number>(40);
   const tableHeight = ref<number>(600);
   let filtersTable = ref<Record<string, unknown>>({});
   const setEndedThead = (payload: number) => {
    endedThead.value = payload;
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
   return {
    filtersTable,
    tableHeight,
    endedThead,
    setEndedThead,
    setTableHeight,
    setFiltersTable,
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
  },
 });
</script>
<style lang="scss" scoped>
 //  .table-multi-sort-model {
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
 //  .table-multi-sort-model {
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
