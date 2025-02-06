<template>
  <div>
    <router-link :to="{ name: 'Create' }" class="button is-success">Add New</router-link>

    <table class="table is-striped is-bordered is-fullwidth table-container">
      <thead>
        <tr>
          <th>User Name</th>
          <th>User Email</th>
          <th>User Address</th>
          <th>User Phone</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="3" class="has-text-centered">No users found.</td>
        </tr>

        <tr v-else v-for="item in items" :key="item.user_id">
          <td>{{ item.user_name }}</td>
          <td>{{ item.user_email }}</td>
          <td>{{ item.user_address }}</td>
          <td>{{ item.user_phone }}</td>
          <td class="has-text-centered">
            <router-link
              :to="{ name: 'Edit', params: { id: item.user_id } }"
              class="button is-warning is-small m-1"
            >
              Edit
            </router-link>
            <button class="button is-danger is-small m-1" @click="deleteUser(item.user_id)">
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
        const response = await axios.get('http://localhost:3000/api/users')
        console.log('API Response:', response.data)
        if (Array.isArray(response.data.response)) {
          items.value = response.data.response
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
        await axios.delete(`http://localhost:3000/api/users/${id}`)
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
  min-width: 1000px;
}
.button.is-success {
  margin-top: 10px;
}
</style>
