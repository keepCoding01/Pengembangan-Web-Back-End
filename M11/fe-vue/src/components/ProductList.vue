<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success">Add New</router-link>

    <table class="table is-striped is-bordered is-fullwidth table-container">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Price</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="3" class="has-text-centered">No products found.</td>
        </tr>

        <tr v-else v-for="item in items" :key="item.product_id">
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_price }}</td>
          <td class="has-text-centered">
            <!-- Tombol Edit -->
            <router-link
              :to="{ name: 'Edit', params: { id: item.product_id } }"
              class="button is-warning is-small"
            >
              Edit
            </router-link>
            <button class="button is-danger is-small" @click="deleteProduct(item.product_id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import axios from "axios"

export default {
  name: "ProductList",
  setup() {
    const items = ref([])

    // Fungsi untuk mendapatkan daftar produk
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products")
        console.log("API Response:", response.data)
        if (Array.isArray(response.data.response)) {
          items.value = response.data.response
        } else {
          items.value = []
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        items.value = []
      }
    }

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`)
        getProducts()
      } catch (err) {
        console.error("Error deleting product:", err)
      }
    }

    onMounted(() => {
      getProducts()
    })

    return {
      items,
      deleteProduct,
    }
  },
}
</script>

<style scoped>
.table-container {
  margin: 10px auto;
}
.button.is-success {
  margin-top: 10px;
}
</style>
