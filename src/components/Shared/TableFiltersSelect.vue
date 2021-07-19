<template>
 <div>
  <v-select
   v-model="queryString"
   :items="items"
   :item-text="'name'"
   :item-value="'id'"
   :label="placeholder || 'Nhập để lọc'"
   clearable
   dense
   solo
   class="table-input-filter"
  ></v-select>
 </div>
</template>

<script lang="ts">
 import { ref, defineComponent, reactive, toRef } from "@vue/composition-api";
 import { SelectFilter } from "@/InterfaceModel/Filter";
 export default defineComponent({
  props: {
   ownHeader: {
    type: Object,
   },
   listenChange: {
    type: Function,
   },
  },
  setup: props => {
   let ownHeader: Record<string, any> | undefined = toRef(props, "ownHeader");
   let listenChange: Record<string, any> = toRef(props, "listenChange");
   const { key, placeholder, items } = ownHeader.value.filters;
   const queryString = ref<string>("");
   let refQuery = ref<number>(0);
   const setRefQuery = (val: number) => {
    refQuery.value = val;
   };
   const handleEmitFilter = () => {
    clearTimeout(refQuery.value);
    let payload: SelectFilter = {
     key,
     value: queryString.value,
    };
    listenChange.value(payload);
   };
   return { items, placeholder, queryString, refQuery, setRefQuery, handleEmitFilter };
  },

  watch: {
   queryString() {
    clearTimeout(this.refQuery);
    this.setRefQuery(
     setTimeout(() => {
      this.handleEmitFilter();
     }, 1000),
    );
   },
  },
 });
</script>

<style lang="scss" scopped>
 .table-input-filter {
  font-size: 12px !important;
  font-weight: 400 !important;
  .v-input__control {
   min-height: 16px !important;
  }
  .v-input__slot {
   box-shadow: none !important;
   border: 1px solid #ececec;
  }
  .v-label {
   font-size: 12px !important;
  }
  .v-text-field__details {
   display: none;
  }
  input {
   &::placeholder {
    font-size: 12px !important;
   }
  }
 }
</style>
