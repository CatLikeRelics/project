<template>
    <div class="flex ml-2 mt-2  ">
        <div class="inner-scroll">
        <ul class="w-30r">
            <li class="flex mb-4" v-for="item in products">
                <div class="w-20 h-20"><img :src="item.url" alt=""></div>
                <div>
                    <p class="ml-3 mt-1 text-xs ">{{ item.name }}</p>
                    <p class="ml-2 mt-4 text-xs text-red-500">￥{{ item.price }}</p>
                    <div class="flex">
                        <p class="ml-2 mt-3 text-xs text-gray-400">库存 {{ item.inventory }}</p>
                        <el-button size="small" class="mt-2 ml-2 bg-primary" type="primary"
                            @click="cartStore.addCartProduct(item)" :disabled="!item.inventory">
                            <el-icon>
                                <ShoppingCart />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
            </li>
        </ul>
</div>
    </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { ShoppingCart } from '@element-plus/icons-vue';
import { ElButton, ElIcon } from 'element-plus';
import { ref } from 'vue';



const productStore = useProductStore()
const { products } = productStore;
const cartStore = useCartStore()






</script>

<style scope>

</style>