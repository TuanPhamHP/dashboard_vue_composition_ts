<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tableData.value"
      :sort-by="[]"
      :sort-desc="[false, true]"
      :hide-default-header="false"
      :height="tableHeight"
      multi-sort
      ref="tableMod"
      class="
        table-modify-css table-consignee-model table-scroll-y
        header-sticky-table header-no-border-table
      "
      hide-default-footer
      :items-per-page="10000"
      :loading="tableLoading"
      loading-text="Loading... Please wait"
      :class="tableLoading ? 'table-on-loading' : ''"
    >
      <template v-slot:body.prepend="{ headers }">
        <tr
          class="filter-prepend-body"
          :style="`top:${endedThead}px;position:sticky;z-index:3`"
        >
          <td
            v-for="header in headers"
            :key="header.text"
            class="pointer"
            :class="header.type === 'date' ? 'date-header' : ''"
          >
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
      <template v-if="tableLoading" v-slot:item>
        <tr>
          <td colspan="999">i'm loading</td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="w-max-content">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <img
                v-on="on"
                v-bind="attrs"
                @click="editItem(item)"
                class="pointer mr-2"
                src="@/assets/images/icon-edit.svg"
                alt=""
              />
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <img
                v-on="on"
                v-bind="attrs"
                @click="getDeleteItem(item.id)"
                class="pointer mr-2"
                src="@/assets/images/icon-remove-r.svg"
                alt=""
              />
            </template>
            <span>Delete</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <img
                v-bind="attrs"
                v-on="on"
                @click="detailItem(item)"
                class="pointer mr-2"
                src="@/assets/images/icon-detail.svg"
                alt=""
              />
            </template>
            <span>View Detail</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <ConfirmDelete
      v-if="logoutIsOpen"
      :logout-is-open="logoutIsOpen"
      :cancel="cancel"
      :delete-item="deleteItem"
      :loading-btn="loadingBtn"
    ></ConfirmDelete>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/services";
import {
  ref,
  defineComponent,
  reactive,
  watch,
  toRefs,
} from "@vue/composition-api";
import {
  TableFiltersInput,
  TableFiltersSelect,
  TableFiltersDateRange,
} from "@/components/Shared/index";
import { NormalFilterObject } from "@/InterfaceModel/Filter";
import { returnFilterObject } from "@/utils/TableFilters";
import ConfirmDelete from "@/components/popup/ConfirmDelete.vue";
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
      default: [],
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
    handleSelectedItemDetail: {
      type: Function,
    },
  },
  components: {
    TableFiltersInput,
    TableFiltersSelect,
    TableFiltersDateRange,
    ConfirmDelete,
  },
  setup: (props, ctx) => {
    const endedThead = ref<number>(40);
    const tableHeight = ref<number>(600);
    const loadingBtn = ref<boolean>(false);
    let filtersTable = ref<Record<string, unknown>>({});
    let selectedData = ref<Record<string, unknown>>({});
    let selectedDataDetail = ref<Record<string, unknown>>({});
    let selectedDataDelete = ref<number>();

    const setEndedThead = (payload: number) => {
      endedThead.value = payload;
    };
    const setSelectedData = (payload: Record<string, unknown>) => {
      selectedData.value = payload;
      ctx.emit("handleSelectedItem", selectedData.value);
    };
    const setSelectedDataDetail = (payload: Record<string, unknown>) => {
      selectedDataDetail.value = payload;
      ctx.emit("handleSelectedItemDetail", selectedDataDetail.value);
    };
    const setLoadingBtn = (payload: boolean) => {
      loadingBtn.value = payload;
    };
    const setSelectedDataDelete = (payload: number) => {
      selectedDataDelete.value = payload;
    };
    const setTableHeight = (payload: number) => {
      tableHeight.value = payload;
    };
    const setFiltersTable = (payload: Record<string, unknown>) => {
      filtersTable.value = payload;
    };
    watch(filtersTable, (currentValue) => {
      // reactive when filter change here
      ctx.emit("handleFilterChange", currentValue);
    });
    //  watch(selectedData, currentValue => {
    //   // reactive when filter change here
    //  });
    //  watch(selectedDataDetail, currentValue => {
    //  });
    return {
      ctx,
      filtersTable,
      loadingBtn,
      tableHeight,
      endedThead,
      selectedData,
      selectedDataDetail,
      selectedDataDelete,
      setEndedThead,
      setTableHeight,
      setLoadingBtn,
      setFiltersTable,
      setSelectedData,
      setSelectedDataDetail,
      setSelectedDataDelete,
    };
  },
  data() {
    return {
      arraySort: [],
      logoutIsOpen: false,
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
    cancel() {
      this.logoutIsOpen = false;
    },
    async deleteItem() {
      this.setLoadingBtn(true);
      const res = await api.consignee.deleteConsignee(this.selectedDataDelete);
      this.setLoadingBtn(false);
      if (!res) {
        this.ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Delete error",
        });
        return;
      }
      try {
        if (res.status > 199 && res.status < 399) {
          this.logoutIsOpen = false;
          this.ctx.root.$store.commit("SET_SNACKBAR", {
            type: "success",
            title: "",
            content: "Delete success",
          });
        } else {
          this.ctx.root.$store.commit("SET_SNACKBAR", {
            type: "error",
            title: "",
            content: "Delete error",
          });
        }
        // const pagination = res.data.meta.pagination;
        // this.setTableData(res.data.data);
        //  setPagination({
        //   total: pagination.total,
        //   total_pages: pagination.total_pages,
        //   per_page: pagination.per_page,
        //   current_page: pagination.current_page,
        //  });
      } catch (error) {
        console.log(error);
        this.ctx.root.$store.commit("SET_SNACKBAR", {
          type: "error",
          title: "",
          content: "Delete error",
        });
      }
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
      this.setSelectedDataDetail(item);
    },
    getDeleteItem(item: number) {
      this.logoutIsOpen = true;
      this.setSelectedDataDelete(item);
    },
  },
});
</script>
<style lang="scss" scoped></style>
<style lang="scss"></style>
