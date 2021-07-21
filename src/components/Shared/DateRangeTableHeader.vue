<template>
 <DateRangePicker
  ref="picker"
  v-model="dateRange"
  :opens="opens"
  :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
  :single-date-picker="singleDatePicker"
  :time-picker="timePicker"
  :time-picker24-hour="timePicker24Hour"
  :show-weeknumbers="showWeekNumbers"
  :show-dropdowns="showDropdowns"
  :auto-apply="autoApply"
  :control-container-class="'range-date-picker'"
  :linked-calendars="linkedCalendars"
  :ranges="settingsRanges"
  @update="updateValues"
  @toggle="checkOpen"
 >
  <template v-slot:input="picker" style="min-width: 350px">
   <div
    class="date-range-slot-wrapper-tb d-star-noflex justify-content-center otbb w-100"
    :class="pickerClass"
    v-if="picker.startDate && picker.endDate"
   >
    <div class="d-flex align-items-center">
     <span class="font-size-12 fw-500 text-center">
      {{ picker.startDate ? getDateObject(picker.startDate) : "Ngày bắt đầu" }}
     </span>
     <p class="font-size-12 pl-2 my-0 mb-0 mr-1">tới</p>
     <span class="font-size-12 fw-500 text-center">
      {{ picker.endDate ? getDateObject(picker.endDate) : "Ngày kết thúc" }}
     </span>
    </div>
    <v-icon class="pointer" @click="handleClearDate"> mdi-close </v-icon>
   </div>
   <div
    v-if="!(picker.startDate && picker.endDate)"
    class="pointer date-range-slot-wrapper-tb font-size-12"
    :class="picker.startDate && picker.endDate ? 'hvll' : ''"
   >
    <span class="pointer font-size-12 d-flex align-items-center">
     {{ placeholderPicker }}
     <v-icon class="font-size-15"> mdi-calendar </v-icon>
    </span>
   </div>
  </template>
 </DateRangePicker>
</template>

<script>
 import { tDate } from "validation_t/src";
 import DateRangePicker from "vue2-daterange-picker";
 import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
 export default {
  props: {
   singleDatePicker: {
    type: Boolean,
    default: false,
   },
   timePicker: {
    type: Boolean,
    default: false,
   },
   timePicker24Hour: {
    type: Boolean,
    default: true,
   },
   showWeekNumbers: {
    type: Boolean,
    default: false,
   },
   showDropdowns: {
    type: Boolean,
    default: true,
   },
   linkedCalendars: {
    type: Boolean,
    default: true,
   },
   autoApply: {
    type: Boolean,
    default: true,
   },
   showRanges: {
    type: Boolean,
    default: false,
   },
   pickedDate: {
    type: Function,
   },
   onFilterAdvance: {
    type: Boolean,
    default: true,
   },
   placeholderPicker: {
    type: String,
    default: "Date Range Picker",
   },
   pickerClass: {
    type: String,
    default: "",
   },
   isClear: {
    type: Boolean,
    default: false,
   },
   defaultDate: {
    type: Object,
    default() {
     return {};
    },
   },
   keyForcedUpdate: {
    type: Number,
    default: 0,
   },
   tableField: {
    type: String,
    default: "",
   },
   opens: {
    type: String,
    default: "right",
   },
  },
  components: { DateRangePicker },
  data() {
   return {
    dateRange: {
     startDate: null,
     endDate: null,
    },
    date: new Date(),
   };
  },
  computed: {
   settingsRanges() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return {
     "Hôm nay": [today, today],
     "Hôm qua": [yesterday, yesterday],
     "Tuần này": [
      new Date(today.getFullYear(), today.getMonth(), new Date().getDate() - new Date().getDay() + 1),
      new Date(today.getFullYear(), today.getMonth(), new Date().getDate() + 7 - new Date().getDay()),
     ],
     "Tháng này": [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)],
     "Tháng trước": [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)],
     "Năm nay": [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)],
    };
   },
  },
   mounted(){
      if (this.defaultDate) {
         this.defaultDate.startDate && this.defaultDate.endDate
         ? (() => {
            let arrFr = this.defaultDate.startDate.split("-");
            let arrTo = this.defaultDate.endDate.split("-");

            this.dateRange = {
            startDate: `${arrFr[1]}-${arrFr[0]}-${arrFr[2]}`,
            endDate: `${arrTo[1]}-${arrTo[0]}-${arrTo[2]}`,
            };
            })()
         : (() => {
            this.dateRange = {
            startDate: null,
            endDate: null,
            };
            })();
      } else {
         this.dateRange = {
         startDate: null,
         endDate: null,
         };
     }
   },

  watch: {
   isClear() {
    if (this.isClear) {
     this.dateRange = {
      startDate: null,
      endDate: null,
     };
    }
   },
   keyForcedUpdate() {
    // console.log('key changes');
    this.handleClearDate();
   },
   defaultDate: {
    deep: true,
    handler() {
     if (this.defaultDate) {
      this.defaultDate.startDate && this.defaultDate.startDate
       ? (() => {
          let arrFr = this.defaultDate.startDate.split("-");
          let arrTo = this.defaultDate.startDate.split("-");

          this.dateRange = {
           startDate: `${arrFr[1]}-${arrFr[0]}-${arrFr[2]}`,
           endDate: `${arrTo[1]}-${arrTo[0]}-${arrTo[2]}`,
          };
         })()
       : (() => {
          this.dateRange = {
           startDate: null,
           endDate: null,
          };
         })();
     } else {
      this.dateRange = {
       startDate: null,
       endDate: null,
      };
     }
    },
   },
  },
  methods: {
   updateValues(_val) {
   let valNew = {
      startDate: this.parseDate(_val.startDate),
      endDate: this.parseDate(_val.endDate),
   }
    
    // console.log(_val, 'updateValues');
    let objReturn = this.tableField ? { fieldUpdate: this.tableField, value: valNew } : { value: valNew };
    this.pickedDate(objReturn);
   },
   checkOpen(_val) {
   //  console.log(_val, "checkOpen");
   },
   getDateObject(_date) {
    let date = tDate.formatDateCustomize(_date);
    return `${date.dd}/${date.MM}/${date.yyyy}`;
   },
   parseDate(_date) {
    let date = tDate.formatDateCustomize(_date);
    return `${date.dd}-${date.MM}-${date.yyyy}`;
   },
   checkInt(_val) {
    // null or undefine is unacceptable
    if (!_val) {
     return false;
    }
    return !isNaN(_val) ? Number.isInteger(+_val) && +_val.toString().length < 20 : false;
   },
   checkFloat(_val) {
    if (!_val) {
     return false;
    }
    return !isNaN(_val);
   },
   checkString(_val) {
    // null or undefine is unacceptable
    if (!_val) {
     return false;
    }
    return _val.toString().length < 256;
   },
   checkText(_val) {
    // null or undefine is unacceptable
    return _val;
   },
   handleClearDate() {
    this.dateRange = {
     startDate: null,
     endDate: null,
    };
    let objDate = {
     fieldUpdate: this.tableField,
     value: this.dateRange,
    };

    this.pickedDate(objDate);
   },
   checkDate(_val) {
    // null or undefine is unacceptable
    if (!_val) {
     return false;
    }
    // date instance : 2020/1/2
    let arr = _val.split("/");
    let a2 = `${arr[1]}/${arr[0]}/${arr[2]}`;
    let a = new Date(_val);
    let b = new Date(a2);
    return !isNaN(a.getTime()) || !isNaN(b.getTime());
   },
  },
 };
</script>

<style lang="scss">
 .vue-daterange-picker {
  .calendars {
   flex-wrap: nowrap !important;
  }
 }
 .calendars.row {
  flex-wrap: nowrap !important;
  padding-bottom: 20px;
 }
 .date-range-slot-wrapper-tb {
  background-color: rgba(255, 255, 255, 0.891);
  min-width: 220px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 28px !important;
  margin-bottom: 4px;
  border: 1px solid rgb(236, 236, 236) !important;
  border-radius: 4px;
  padding-left: 10px;
 }
 .v-date-picker-table {
  table {
   tr {
    td {
     button {
      color: #000 !important;
     }
    }
   }
  }
 }
</style>
