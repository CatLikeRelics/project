<template>
    <div class="mt-4 ml-4">
        <div>
            <ul>
                <li class="flex ">
                    <div class="w-24 h-24"><img :src="( linkProducts || productLink || initialSrc )"></div>
                    <div>
                        <p class="ml-3 mt-1 text-xs ">{{ productName }}</p>
                        <p class="ml-3 mt-5 text-xs text-red-500">￥{{ price }}</p>
                        <p class="ml-3 mt-4 text-xs text-gray-400">库存 {{ inventory }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <el-form label-position="top" size="small" class="mt-6 ml-4"  ref="addProductsRef">
            <el-form-item label="商品图片 ">
                <input type="file" class="text-xs" @change="handleChange">
            </el-form-item>
            <p class="text-xss -mt-3 mb-4 text-gray-400">图片大小不能超过100k</p>
            <el-form-item label="商品名称" prop="name">
                <el-input class="w-80 " v-model="productName" clearable></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input-number v-model="price"  :step="1" :min="1" />
            </el-form-item>
            <el-form-item label="商品库存" prop="inventory">
                <el-input-number v-model="inventory" :step="1" :min="1" />
            </el-form-item>
            <el-form-item label="图片链接" prop="productLink">
                <el-input v-model="productLink" :disabled="Link" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addProduct" class="bg-primary">添加商品</el-button>
                <el-button @click="resetForm">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Src from '@/assets/5b1f9c32N77d3c908.jpg'
import { ElButton, ElForm, ElFormItem, ElImage, ElInput, ElInputNumber, ElMessage, type FormInstance } from 'element-plus';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore()


const initialSrc = ref(Src)
const productName = ref("天才在左疯子在右")
const price = ref(0.1)
const inventory = ref(1)
const productLink = ref("")
const Link = ref(false)
const linkProducts = ref("")



function handleChange(event: Event) {
    const fileInput = <HTMLInputElement>event.target
    if (fileInput.value != null) {
        Link.value = true
    }
    const file = fileInput.files![0]
    const fileSize = 100 * 1024
    if (file.size < fileSize) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("loadend", (event: ProgressEvent<FileReader>) => {
            const base64 = event.target?.result;
            productLink.value = base64 as string
            linkProducts.value = base64 as string
            fileInput.value = ""
        })
    } else {
        ElMessage.error('图片超过100k,请重新上传！！')
        fileInput.value = ""

    }
}





const addProduct = () => {
    if (productName.value != "" && productLink.value != "") {
        const addProducts = {
            id: 0,
            url: productLink.value,
            name: productName.value,
            price: price.value,
            inventory: inventory.value
        }

        productStore.addProducts(addProducts)
        resetForm()
        ElMessage({
            message: '商品 ' + addProducts.name + ' 添加成功',
            type: 'success',
        })
    } else {
        ElMessage.error('商品名称或图片链接不能为空')
    }

}

const resetForm = () => {

    productName.value = "天才在左疯子在右"
    price.value = 0.1
    inventory.value = 1
    linkProducts.value = ""
    productLink.value = ""
    Link.value = false
}



</script>

<style scope>

</style>