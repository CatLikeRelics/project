<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from './stores/cart';

const productStore = useProductStore()
const cartStore = useCartStore()
onMounted(() => {
  productStore.init()
  cartStore.initCarts()

})

</script>

<template>
  <RouterView />
</template>

<style scoped>


</style>
