<template>

  <div class="flex justify-center mt-20">
    <div class=" w-36r  relative border-gray-100 border-2 flex">
      <el-menu default-active="1" class="h-full  " collapse="true" @select="handleSelect">
        <el-menu-item index="1">
          <el-icon><Goods /></el-icon>
          <template #title>商品</template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><ShoppingCart/></el-icon>
          <template #title>购物车</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Sell /></el-icon>
          <template #title>添加商品</template>
        </el-menu-item>
      </el-menu>
      <component :is="components" ></component>
    </div>
  </div>
  <div class="flex justify-center mt-3 mb-12">
    <el-tag class="h-4 mx-1" round type="success">Vue</el-tag>
    <el-tag class="h-4 mx-1" round type="danger">Vtie</el-tag>
    <el-tag class="h-4 mx-1" round type="info">Pinia</el-tag>
    <el-tag class="h-4 mx-1" round >Element Plus</el-tag>
    <el-tag class="h-4 mx-1" round type="warning">Tailwind CSS</el-tag>
    <el-tag class="h-4 mx-1 text-purple-500 bg-purple-300" round >TypeScript</el-tag>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Product from '@/components/Product.vue';
import Cart from '@/components/ShoppingCart.vue';
import AddProducts from '@/components/AddProducts.vue';
import {useProductStore} from '@/stores/product'

const components = ref(Product)
const productStore = useProductStore()

const handleSelect = (key: string) => {
  if(key == "1"){
    components.value = Product
  }else if(key == '2'){
    components.value = Cart
  }else if(key == '3'){
    components.value = AddProducts
  }
}

onMounted(() => {
  
})

</script>

<style scope>

</style>