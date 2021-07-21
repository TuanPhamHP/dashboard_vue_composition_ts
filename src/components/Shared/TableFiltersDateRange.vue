<template>
 <div>
  <DateRangeTableHeader
   :key-forced-update="filterDateKey"
   :placeholder-picker="'Date'"
   :picked-date="pickedDate"
   :table-field="'date'"
   :opens="'right'"
   :default-date="ownHeader.filters.defaultValue"
  />
 </div>
</template>

<script lang="ts">
 import { ref, defineComponent, reactive, toRef } from "@vue/composition-api";
 import { SelectFilter } from "@/InterfaceModel/Filter";
 import DateRangeTableHeader from "./DateRangeTableHeader.vue";
 export default defineComponent({
  props: {
   ownHeader: {
    type: Object,
   },
   listenChange: {
    type: Function,
   },
  },
  components: { DateRangeTableHeader },
  setup: props => {
   let ownHeader: Record<string, any> | undefined = toRef(props, "ownHeader");
   let listenChange: Record<string, any> = toRef(props, "listenChange");
   const { hasKey,key, placeholder, items } = ownHeader.value.filters;
   const queryString = ref<Record<string, any>>({});
   let refQuery = ref<number>(0);
   let filterDateKey = ref<number>(0);
   const setRefQuery = (val: number) => {
    refQuery.value = val;
   };
   const handleEmitFilter = () => {
    clearTimeout(refQuery.value);
    let _obj : Record<string,string>={}
    const _value = queryString.value
    Object.keys(_value).forEach(o=>{
      _obj[`${hasKey?key+'.':''}${o}`]= _value[o]
    })
    // let payload: Record<string,string> = {
    //  key,
    //  value: queryString.value,
    // };
    listenChange.value(_obj);
   };
   const pickedDate = (_val: any) => {
    queryString.value = _val.value
   };

   return { filterDateKey, items, placeholder, queryString, refQuery, setRefQuery, handleEmitFilter, pickedDate };
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
