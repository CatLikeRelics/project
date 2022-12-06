import { defineStore } from 'pinia'
import type { AllProduct, CartProduct, Product } from '@/api/shop'
import { computed, reactive } from 'vue'
import { useProductStore } from './product'
import { ElMessage } from 'element-plus'



export const useCartStore = defineStore('cart', () => {




  const carts: CartProduct[] = reactive([

  ])

  function initCarts() {
    const cartList = window.localStorage.getItem("cart")
    if (cartList) {
      carts.push(...JSON.parse(cartList))
    }
  }

  function addCartProduct(product: Product) {

    const productStore = useProductStore()
    const { products } = productStore
    //查看商品有无库存
    if (product.inventory! < 1) {
      return;
    }
    //查看购物车有无该商品
    const cartItem = carts.find((item: { id: number }) => item.id === product.id);
    if (cartItem) {
      const productItem = products.find(item => item.id === product.id);
      if (productItem?.inventory != 0) {
        cartItem.quantity++
      }
    } else {
      carts.push({
        id: product.id,
        url: product.url,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    }
    if (product.inventory! > 1) {
      ElMessage({
        message: product.name + ' 已添加至购物车',
        type: 'success',
      })
    }

    productStore.decrementProduct(product)
    productStore.persistenceProduct()
    persistenceCart()
  }

  function decrementCartProduct(cartProduct: CartProduct) {
    const ret = carts.find(item => item.id === cartProduct.id)
    if (ret) {
      ret.quantity--
      const productStore = useProductStore()
      productStore.persistenceProduct()
      persistenceCart()
    }
  }

  function deleteCartProduct(cartProduct: CartProduct) {
    const i = carts.indexOf(cartProduct)
    if (i > -1) {
      carts.splice(i, 1)
      ElMessage({
        message: cartProduct.name + ' 从购物车中删除',
        type: 'success',
      })

      const productStore = useProductStore()
      productStore.resetProductInventory(cartProduct)
      productStore.persistenceProduct()
      persistenceCart()
    }
  }

  const totalPrice = computed(() => {
    let ret = 0
    carts.forEach(item => {
      ret += item.price * item.quantity;
    })
    return ret
  })


  const totalQuantity = computed(() => {
    let ret = 0
    carts.forEach(item => {
      ret += item.quantity
    })
    return ret
  })

  function persistenceCart() {
    window.localStorage.setItem("cart", JSON.stringify(carts))
  }


  return { carts, addCartProduct, decrementCartProduct, deleteCartProduct, totalPrice, totalQuantity, persistenceCart, initCarts }

})
