<template>
  <div class="page-container-manifest-detail">
    <div class="mb-4 page-header">
      <span
        class="
          title-page
          font-size-32 font-weight-bold
          text-uppercase
          display-flex
          align-center
        "
      >
        <span @click="getManifest" class="align-justify-center mr-4 pointer btn-back-page">
          <img src="@/assets/images/arrow-left.svg" alt="" />
        </span>
        Manifest Detail
      </span>
    </div>
    <div class="page-content">
      <!-- <v-btn @click="setupData" class="mb-3 mx-3">Setup Data</v-btn> -->
      <div style="display: flex">
        <div class="mb-3">
          <div class="form-data">
            <div class="header-input">Destination</div>
            <input class="form-input-manifest margin-left-side" type="text" />
            <div class="header-input">CD No.</div>
            <input class="form-input-manifest" type="text" />
          </div>
          <div class="form-data">
            <div class="header-input">Flight No</div>
            <input class="form-input-manifest margin-left-side" type="text" />
            <div class="header-input">Date</div>
            <input class="form-input-manifest" type="date" />
          </div>
          <div class="form-data">
            <div class="header-input">Remark</div>
            <input class="form-input-manifest margin-left-side" type="text" />
            <div class="header-input">Time</div>
            <input class="form-input-manifest" type="time" />
          </div>
        </div>
        <div class="buttons">
          <v-btn @click="setupData" class="mb-3 mx-3 export-button"
            ><img
              src="../../assets/images/vector.png"
              width="21px"
              height="21px"
              style="margin-right: 16px"
            />Export</v-btn
          >
          <v-btn
            color="#2F6BFF"
            @click="setupData"
            class="mb-3 mx-3 create-button"
            ><img
              src="../../assets/images/save-icon.png"
              width="18px"
              height="18px"
              style="margin-right: 16px"
            />
            Save</v-btn
          >
        </div>
      </div>
      <p
        class="
          font-size-16
          add-bag
          text-decoration-underline
          pointer
          display-inline-block
        "
        @click="isVisible = true"
      >
        Add a new bag
      </p>
      <div>
        <TableManifestDetail
          :table-data="tableData"
          :table-loading="loadingTable"
          :headers="headers"
          @handleFilterChange="filterTableChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
import api from "@/services";
import TableManifestDetail from "@/components/Table/TableManifestDetail.vue";
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
    TableManifestDetail,
    SharedPagination,
  },
  setup: (props) => {
    const { queryRoute, stringQueryRender, getQueryRoute } = useRouteQuery();
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
        text: "Bag Number",
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
      // {
      //  text: "Calories",
      //  value: "calories",
      //  type: "string",
      //  filters: {
      //   type: "select",
      //   key: "calories",
      //   placeholder: "Lọc select",
      //   items: [
      //    {
      //     id: 1,
      //     name: "Lựa chọn 1",
      //    },
      //    {
      //     id: 2,
      //     name: "Lựa chọn 2",
      //    },
      //    {
      //     id: 3,
      //     name: "Lựa chọn 3",
      //    },
      //   ],
      //   defaultValue: "",
      //  },
      // },
      {
        text: "Package Number",
        value: "package",
        type: "string",
        filters: {
          type: "string",
          key: "carbs",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "Item Details",
        value: "date",
        type: "string",
        filters: {
          type: "daterange",
          key: "fat",
          placeholder: "Tên bộ lọc",
          defaultValue: {},
          hasKey: true,
        },
      },
      {
        text: "Weight (kg)",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "Sender",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "Consignee",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "ID No.",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "Address",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      {
        text: "Tel No",
        value: "destination",
        type: "string",
        filters: {
          type: "string",
          key: "protein",
          placeholder: "Tên bộ lọc",
          defaultValue: "",
        },
      },
      // {
      //  text: "Iron (%)",
      //  value: "iron",
      //  type: "string",
      //  filters: {
      //   type: "string",
      //   key: "iron",
      //   placeholder: "Tên bộ lọc",
      //   defaultValue: "",
      //  },
      // },
      // { text: "Actions", value: "actions", sortable: false, filters: {} },
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
      currentRouteQuery,
    };
  },
  watch: {},
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
    getManifest() {
      this.$router.push("/manifest");
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

<style lang="scss">
.page-container-manifest-detail {
  padding: 18px 18px 0;
  .page-content {
    padding: 30px;
    background: #ffffff;
    border: 0.3px solid #b9b9b9;
    box-sizing: border-box;
    border-radius: 14px;
  }
  .add-bag {
    color: #1397e3;
  }
  .btn-back-page {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffffff;
  }
}
.buttons {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.create-button {
  mix-blend-mode: normal;
  opacity: 0.9;
  height: 40px !important;
  border-radius: 8px;
  color: #ffffff !important;
  font-size: 14px !important;
  text-transform: none;
  font-weight: 700;
  box-shadow: none;
}
.export-button {
  mix-blend-mode: normal;
  height: 40px !important;
  opacity: 0.9;
  border: 1px solid #2f6bff;
  border-radius: 8px;
  color: #2f6bff !important;
  text-transform: none;
  box-shadow: none;
  font-weight: 700;
  background-color: #ffffff !important;
}
.form-data {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.header-input {
  width: 120px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #404040;
}
.margin-left-side {
  margin-right: 81px;
}
.form-input-manifest {
  padding: 6px 0px 7px 13px;
  font-size: 14px;
  font-weight: 400;
  background: #ffffff;
  border: 0.6px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 4px;
  height: 32px;
  width: 157px;
}
</style>
