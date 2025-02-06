<template>
  <div>
    <div class="field">
      <label class="label">Product Name</label>
      <div class="control">
        <input type="text" placeholder="Product Name" v-model="productName" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Product Price</label>
      <div class="control">
        <input type="number" placeholder="Price" v-model="productPrice" class="input" />
      </div>
    </div>

    <div class="control">
      <button class="button is-warning" @click="updateProduct">UPDATE</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter, useRoute } from "vue-router"

export default {
  name: "ProductEdit",
  setup() {
    const productName = ref("")
    const productPrice = ref("")
    const router = useRouter()
    const route = useRoute()

    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${route.params.id}`)
        productName.value = response.data.response[0].product_name
        productPrice.value = response.data.response[0].product_price
      } catch (err) {
        console.error("Error fetching product:", err)
      }
    }

    const updateProduct = async () => {
      if (!productName.value || !productPrice.value) {
        alert("Please fill in all fields!")
        return
      }
      try {
        await axios.put(`http://localhost:3000/api/products/${route.params.id}`, {
          product_name: productName.value,
          product_price: productPrice.value,
        })
        router.push("/")
      } catch (err) {
        console.error("Error updating product:", err)
      }
    }

    onMounted(() => {
      getProductById()
    })

    return {
      productName,
      productPrice,
      updateProduct,
    }
  },
}
</script>

<style scoped></style>
