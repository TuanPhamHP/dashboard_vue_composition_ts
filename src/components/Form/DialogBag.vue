<template>
    <v-dialog
        v-model="isVisible"
        persistent
        max-width="590"
    >
        <v-card class="dialog-bag">
            <v-card-title class="text-h5">
                {{Object.keys(selectedData).length?"Update":"Create"}} Bag
            </v-card-title>
            <v-card-text>
                <div class="form-item mb-5">
                    <span class="form-lable">
                        Bag Number
                    </span>
                    <span class="form-input">
                        <input type="text" placeholder="Bag number" v-model="formData.bagNumber">
                    </span>
                </div>
                <div class="form-item ">
                    <span class="form-lable">
                        Creation Date
                    </span>
                    <span class="form-input">
                        <input type="date" v-model="formData.creationDate">
                    </span>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                text
                @click="btnCancelClick"
                class="buton-secondary button-size"
                >
                Cancel
                </v-btn>
                <v-btn
                text
                @click="btnSubmitClick"
                class="buton-primary button-size"
                >
                    {{Object.keys(selectedData).length?"Update":"Create"}}
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
        const btnCancelClick = ()=>{
            ctx.emit('handlerCancel')
        }
        const btnSubmitClick = ()=>{
            ctx.emit('handlerSubmit',formData.value)
        }
        return { 
            formData,
            btnCancelClick,
            btnSubmitClick
            };
    },
    methods:{
        
    }
})
</script>

<style lang="scss"> 
    .v-dialog .dialog-bag{
        border-radius: 14px;
        padding: 35px 35px;
        &>.v-card__title{
            padding-top: 0 !important;
            padding-bottom: 60px !important;
            font-size: 32px !important;
            color: #202224;
            font-weight: 700;
        }
        .form-item{
            display: flex;
                align-items: center;
            .form-lable{
                width: 35%;
                color: #606060;
                font-size: 14px;
            }
            .form-input{
                width: 65%;
                input{
                    width: 100%;
                    background: #FFFFFF;
                    border: 0.6px solid #D5D5D5;
                    box-sizing: border-box;
                    border-radius: 4px;
                    height: 52px;
                    font-size: 16px;
                    font-weight: 400;
                    color :#2E2E2E;
                    outline: unset;
                    padding: 0 20px;
                    &::placeholder{
                        color :#2E2E2E;
                    }
                }
            }
        }
        
    }
    .buton-primary{
        background-color: #4880FF;
        border:2px solid #4880FF; 
        span{
            color: #FFFFFF; 
        }
    }
    .buton-secondary{
        background-color: #FFFFFF;
        border:2px solid #4880FF; 
        span{
            color: #4880FF; 
        }
    }
    .button-size{
        height: 56px !important;
        padding: 0 60px !important;
        border-radius: 12px;
    }
</style>