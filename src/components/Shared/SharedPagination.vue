<template>
  <v-layout
    row
    wrap
    style="min-width: 500px; margin-top: 12px"
    class="pagination-t"
  >
    <v-flex xs12 sm12 md12 class="pg-wr align-items-center">
      <p class="mb-0">{{ totalMessage }}</p>
      <v-pagination
        class="custom"
        v-model="pagination.page"
        :length="totalPage"
        total-visible="7"
        @input="pageChange"
      ></v-pagination>
      <v-flex class="grow-unset paginate">
        <p class="dot-page">/page</p>
        <v-select
          class="select-size pt-0"
          v-model="pagination.rowsPerPage"
          :items="pageSizes"
          @change="pageSizeChange"
        >
        </v-select>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    //  totalPage: { type: Number, default: 0 },
    //  rowsPerPage: { type: Number, default: 15 },
    //  total: { type: Number, default: 0 },
    //  page: { type: Number, default: 1 },
    //  lastRowPage: { type: Number, default: 50 },
    //  firstRowPage: { type: Number, default: 1 },
    paginationSync: { type: Object },
  },
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 15,
      },
      pageSizes: [15, 50, 100, 200, 300, 1000],
    };
  },
  created() {
    if (this.paginationSync) {
      this.pagination.page = this.paginationSync.current_page;
      this.pagination.rowsPerPage = this.paginationSync.per_page;
    }
  },
  computed: {
    ...mapState({
      previousPagination: (state) => state.previousPagination,
    }),
    totalPage() {
      return this.paginationSync ? this.paginationSync.total_pages : 1;
    },
    total() {
      return this.paginationSync ? this.paginationSync.total : 1;
    },
    totalMessage() {
      if (
        !this.paginationSync ||
        this.paginationSync.total === 0 ||
        !this.paginationSync.total
      ) {
        return `0 item`;
      }
      const fromIdx =
        (this.paginationSync.current_page - 1) * this.paginationSync.per_page +
        1;
      const toIdx = Math.min(
        this.paginationSync.current_page * this.paginationSync.per_page,
        this.paginationSync.total
      );

      return `${fromIdx}-${toIdx} of ${this.paginationSync.total} items`;
    },
  },
  watch: {
    rowsPerPage() {
      this.pagination.rowsPerPage = this.rowsPerPage;
    },
    page() {
      this.pagination.page = this.page;
    },
  },
  methods: {
    pageSizeChange() {
      this.pagination.page = 1;
      this.$emit("handlePageSizeChange", {
        page: this.pagination.page,
        per_page: this.pagination.rowsPerPage,
      });
    },
    pageChange() {
      this.$emit("handlePageChange", {
        page: this.pagination.page,
        per_page: this.pagination.rowsPerPage,
      });
    },
  },
};
</script>
<style lang="scss">
.pagination-t {
  align-items: center;
  flex-wrap: nowrap !important;
  justify-content: space-between;
  .pg-wr {
    display: flex;
    justify-content: flex-end !important;
  }
  .select-text {
    width: 100px;
    background-color: #fafafa;
    z-index: 7;
    font-size: 10px !important;
    color: #808890;
  }
  .select-size .v-input__slot::before {
    display: none;
  }
  .v-pagination .v-pagination__navigation .v-icon {
    color: #d9d9d9 !important;
  }
  .select-size .v-select__slot {
    border: 1px solid #e5e7e8;
    border-radius: 4px;
    width: 85px;
    margin-right: 12px;
    .v-select__selections {
      margin-left: 6px !important;
      width: 54px !important;
    }
  }
  .select-size {
    .v-input__control {
      flex-grow: unset;
      width: fit-content;
    }
  }
  .paginate {
    height: 41px;
    display: flex;
    position: relative;
    .v-select__selection--comma {
      margin: 7px 4px 7px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
  .dot-page {
    position: absolute;
    right: 25px;
    display: none;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    bottom: -6px;
  }
  .custom .v-pagination__navigation {
    box-shadow: none !important;
    background-color: rgb(250, 250, 250) !important;
    outline: none !important;
    min-width: 32px !important;
    border: 1px solid #d9d9d9;
    background-image: url("../../assets/images/chevron-left@3x.png");
    height: 32px !important;
  }
  .custom .v-pagination__item {
    font-size: 14px !important;
    box-shadow: none !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-weight: 400;
    outline: none !important;
    border: 1px solid #d9d9d9;
    margin-right: 8px !important;
    min-width: 32px !important;
    height: 32px !important;
    background-color: #fafafa !important;
    &--active {
      font-size: 14px !important;
      border: 1px solid #1890ff !important;
      color: #1890ff !important;
    }
  }
  .v-list__tile {
    min-width: 50px !important;
  }
  .custom .v-pagination__item:focus {
    font-size: 15px !important;
    box-shadow: none !important;
    border: none !important;
    outline: none !important;
  }
}
</style>
