import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { CartProduct, Product } from '@/api/shop'
import { useCartStore } from '@/stores/cart';
import img1 from '@/assets/美国纽约摄影学院摄影教材.jpg'
import img2 from '@/assets/一句顶万句.jpg'
import img3 from '@/assets/Vue.js架构与Web前端开发.jpg'
import img4 from '@/assets/Vue.js全家桶.jpg'


export const useProductStore = defineStore('product', () => {

  const products: Product[] = reactive([

  ])

  const nextId  = ref(5)

  function init() {
    const productList = window.localStorage.getItem("products")
    const nextIds = window.localStorage.getItem("nextId")
    if(nextIds){
      nextId.value = nextIds as unknown as number
    }
    if (productList) {
      products.push(...JSON.parse(productList))
    } else {
      products.push(
        ...[
          {
            id: 1,
            url: img1,
            name: "美国纽约摄影学院摄影教材（套装共2册）",
            price: 199,
            inventory: 5
          },
          {
            id: 2,
            url: img2,
            name: "一句顶万句",
            price: 39,
            inventory: 12
          },
          {
            id: 3,
            url: img3,
            name: "Vue.js架构与Web前端开发",
            price: 69,
            inventory: 20
          },
          {
            id: 4,
            url: img4,
            name: "Vue.js全家桶零基础入门到进阶项目实战",
            price: 103,
            inventory: 6
          },
        ])
    }
  }


  function addProducts(product: Product) {
    product.id = nextId.value
    const productsItem = products.find((item: { id: number }) => item.id === product.id);
    if (productsItem) {
      const productItem = products.find((item: { id: number; }) => item.id === product.id);
      if (productItem?.inventory != 0) {
        productsItem.inventory! ++
        persistenceProduct()
      }
    } else {
      products.push({
        id: nextId.value,
        url: product.url,
        name: product.name,
        price: product.price,
        inventory: product.inventory,
      })
      nextId.value++
      persistenceProduct()
    }
  }


  function decrementProduct(product: Product) {
    const ret = products.find(item => item.id === product.id)
    if (ret) {
      if (ret.inventory != 0) {
        ret.inventory! --
        const cartStore = useCartStore()
        cartStore.persistenceCart()
        persistenceProduct()
      }
    }
  }

  function addProductInventory(product: CartProduct) {
    const ret = products.find(item => item.id === product.id)
    if (ret) {
      ret.inventory! ++;
    }
    const cartStore = useCartStore()
    cartStore.decrementCartProduct(product)
    cartStore.persistenceCart()
    persistenceProduct()
  }

  function resetProductInventory(product: CartProduct) {
    const ret = products.find(item => item.id === product.id)
    if (ret) {
      ret.inventory! += product.quantity
    }
  }

  function persistenceProduct() {
    window.localStorage.setItem("products", JSON.stringify(products))
    window.localStorage.setItem("nextId", JSON.stringify(nextId))
  }

  return { products, decrementProduct, addProductInventory, resetProductInventory, addProducts, persistenceProduct, init }


})
