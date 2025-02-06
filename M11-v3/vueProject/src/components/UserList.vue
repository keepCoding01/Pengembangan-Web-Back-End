<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success">Add New</router-link>

    <table class="table is-striped is-bordered is-fullwidth table-container">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Note</th>
          <th>Category</th>
          <th>CreatedAt</th>
          <th>UpdatedAt</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="3" class="has-text-centered">No users found.</td>
        </tr>

        <tr v-else v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.note }}</td>
          <td>{{ item.category_id }}</td>
          <td>{{ item.createdAt }}</td>
          <td>{{ item.updatedAt }}</td>
          <td class="has-text-centered">
            <router-link
              :to="{ name: 'Edit', params: { id: item.id } }"
              class="button is-warning is-small m-1"
            >
              Edit
            </router-link>
            <button class="button is-danger is-small m-1" @click="deleteUser(item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'userList',
  setup() {
    const items = ref([])

    // Fungsi untuk mendapatkan daftar produk
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes')
        console.log('API Response:', response.data)
        if (Array.isArray(response.data.data)) {
          items.value = response.data.data
        } else {
          items.value = []
        }
      } catch (err) {
        console.error('Error fetching users:', err)
        items.value = []
      }
    }

    const deleteUser = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/notes/${id}`)
        getUsers()
      } catch (err) {
        console.error('Error deleting user:', err)
      }
    }

    onMounted(() => {
      getUsers()
    })

    return {
      items,
      deleteUser,
    }
  },
}
</script>

<style scoped>
.table-container {
  margin: 10px auto;
  min-width: 1200px;
}
.button.is-success {
  margin-top: 10px;
}
</style>
