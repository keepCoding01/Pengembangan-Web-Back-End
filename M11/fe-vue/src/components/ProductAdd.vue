<template>
  <div>
    <div class="field">
      <label class="label">Product Name</label>
      <div class="control">
        <input type="text" class="input" placeholder="Product Name" v-model="product_name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Product Price</label>
      <div class="control">
        <input type="text" class="input" placeholder="Product Price" v-model="product_price" />
      </div>
    </div>

    <div class="control">
      <button class="button is-success" @click="saveProduct">SAVE</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

export default {
  name: "ProductAdd",
  setup() {
    const product_name = ref("")
    const product_price = ref("")
    const router = useRouter()

    const saveProduct = async () => {
      if (!product_name.value || !product_price.value) {
        alert("Please fill in all fields!")
        return
      }
      try {
        await axios.post("http://localhost:3000/api/products", {
          product_name: product_name.value,
          product_price: product_price.value,
        })
        product_name.value = ""
        product_price.value = ""
        router.push("/")
      } catch (err) {
        console.error("Error saving product:", err)
      }
    }

    return {
      product_name,
      product_price,
      saveProduct,
    }
  },
}
</script>

<style scoped></style>
