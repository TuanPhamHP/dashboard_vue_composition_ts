<template>
    <v-dialog
        v-model="isVisible"
        persistent
        max-width="590"
    >
        <v-card class="dialog-bag-detail">
            <v-card-title class="text-h5">
                Add new Package to this Bag
            </v-card-title>
            <v-card-text>
                <div class="form-item mb-9">
                    <v-select
                        :items="dataSelect"
                        placeholder="Standard"
                    ></v-select>
                    <v-radio-group v-model="radioGroup" class="mt-0 pl-3">
                        <v-radio
                            v-for="n in 3"
                            :key="n"
                            :label="`8880002949001, Clothing, Phạm Văn Hùng ${n}`"
                            :value="n"
                        ></v-radio>
                    </v-radio-group>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                text
                @click="btnCancelClick"
                class="buton-secondary button-size border-width-2px mr-4 text-transform-unset"
                >
                Cancel
                </v-btn>
                <v-btn
                text
                @click="btnSubmitClick"
                class="buton-primary button-size text-transform-unset"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent,ref } from "@vue/composition-api";
export default defineComponent({
    props:{
        isVisible:{
            type:Boolean,
            default:false
        },
        selectedData:{
            type:Object,
            default:{}
        },
        handlerCancel:{
            type:Function
        },
        handlerSubmit:{
            type:Function
        }
    },
    setup: (props,ctx) => {
        let formData = ref<Record<string, any>>({});
        const dataSelect =ref([])
        const radioGroup =ref(1)
        const btnCancelClick = ()=>{
            ctx.emit('handlerCancel')
        }
        const btnSubmitClick = ()=>{
            ctx.emit('handlerSubmit',formData.value)
        }
        return { 
            formData,
            dataSelect,
            radioGroup,
            btnCancelClick,
            btnSubmitClick
            };
    },
    methods:{
        
    }
})
</script>

<style lang="scss"> 
    .v-dialog .dialog-bag-detail{
        border-radius: 14px;
        padding: 35px 35px;
        &>.v-card__title{
            padding-top: 0 !important;
            padding-bottom: 30px !important;
            font-size: 32px !important;
            color: #202224;
            font-weight: 700 !important;
        }
        .form-item{
            border: 0.6px solid #A0A0A0;
            box-sizing: border-box;
            border-radius: 6px 6px 0px 0px;
            .v-select{
                padding-top: 0;
                .v-select__slot{
                    .v-label{
                        margin-left: 15px;
                    }
                    .v-select__selections input{
                        padding-left: 15px;
                        &::placeholder{
                            color: #444444;
                        }
                    }
                }
            }
            .v-input--radio-group__input{
                .v-radio {
                    label{
                        font-weight: 400;
                        font-size: 14px;
                        color: #444444;
                    }
                }
            }
            
        }
        .border-width-2px{
            border-width: 2px !important;
        }
        
    }
    .button-size{
        height: 56px !important;
        padding: 0 60px !important;
        border-radius: 12px;
    }
</style>