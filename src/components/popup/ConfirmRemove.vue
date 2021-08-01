<template>
  <v-dialog v-model="isVisible" persistent max-width="520px">
    <v-card>
      <v-card-title class="header py-5">
        <p class="mb-0 py-5">Do you really want to delete this {{title}}?</p>
      </v-card-title>
      <v-card-actions class="p-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" class="cancel" > Cancel </v-btn>
        <v-btn text @click="confirm" class="yes" :loading="loadingBtn"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, toRef,toRefs } from "@vue/composition-api";
import { mapState } from "vuex";
import store from "@/store";
export default defineComponent({
  props:{
    isVisible:{
      type:Boolean,
      default:false,
    },
    handlerCancel:{
      type:Function,
    },
    handlerConfirm:{
      type:Function,
    },
    loadingBtn:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
    }
  },
  setup(props){
    let handlerCancel: Record<string, any> = toRef(props, "handlerCancel");
    let handlerConfirm: Record<string, any> = toRef(props, "handlerConfirm");
    const cancel = ()=>{
      handlerCancel.value();
    }
    const confirm = ()=>{
      handlerConfirm.value();
    }
    return{
      cancel,
      confirm
    }
  }
});
</script>
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";
.header {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 37px;
  letter-spacing: -0.114286px;
  color: $primaryBlack;
}
.cancel {
  border: 2px solid $primaryText;
  border-radius: 12px;
  padding: 0 8px;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  height: 36px;
  width: 126px;
  text-align: center;
  letter-spacing: -0.0642857px;
  padding-top: 6px;
  color: $primaryText;
  text-transform: uppercase;
  cursor: pointer;
}
.yes {
  border: 1px solid $primaryText;
  padding: 0 8px;
  height: 36px;
  width: 126px;
  text-transform: uppercase;
  cursor: pointer;
  background: $primaryText;
  mix-blend-mode: normal;
  opacity: 0.9;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  padding-top: 6px;
  text-align: center;
  letter-spacing: -0.0642857px;

  color: $primaryWhite;
}
</style>
