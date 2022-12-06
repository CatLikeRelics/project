<template>
    <div class="flex ml-2 mt-2  mb-16">
        <div class="inner-scroll">
        <ul>
            <li class="flex mb-4 " v-for="item in carts" :key="item.id">
                <div class="w-20 h-20"><img :src="item.url" alt=""></div>
                <div class="w-104">
                    <p class="ml-3 mt-1 text-xs ">{{ item.name }}</p>
                    <div class="flex ">
                        <p class="ml-2 mt-4 text-xs text-red-500">￥{{ item.price }}</p>
                        <div class="flex-grow"></div>
                        <el-button class="w-1 h-1 mt-3.5" :disabled="(item.quantity == 1)"
                            @click="productStore.addProductInventory(item)"><el-icon>
                                <Minus />
                            </el-icon></el-button>
                        <el-tag class="w-1 h-1.1r mt-3.5 bg-white" type="info" disable-transitions="true">{{
                                item.quantity
                        }}</el-tag>
                        <el-button class="w-1 h-1 mt-3.5" @click="cartStore.addCartProduct(item)"><el-icon>
                                <Plus />
                            </el-icon></el-button>
                    </div>
                    <div class="flex">
                        <el-button size="small" class="mt-2 ml-2 bg-red-500" type="danger"
                            @click="cartStore.deleteCartProduct(item)"><el-icon>
                                <Delete />
                            </el-icon></el-button>
                    </div>
                </div>
            </li>
            <div class="bottom-0 absolute ">
                <el-divider class="w-30.5r" />
                <div class="flex w-full mb-5 ">
                    <div class=" ml-4 text-xs ">共 {{ cartStore.totalQuantity }} 件商品合计：</div>
                    <div class="text-xs text-red-600">
                        <p>￥{{ cartStore.totalPrice }}</p>
                    </div>
                </div>
            </div>
        </ul>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { Delete, Minus, Plus } from '@element-plus/icons-vue';
import { ElButton, ElIcon, ElTag, ElDivider } from 'element-plus';



const productStore = useProductStore()

const cartStore = useCartStore()
const { carts } = cartStore;





</script>

<style scope>

</style>