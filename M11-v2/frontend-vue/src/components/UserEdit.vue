<template>
  <div>
    <div class="field">
      <label class="label">User Name</label>
      <div class="control">
        <input type="text" placeholder="User Name" v-model="userName" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">User Email</label>
      <div class="control">
        <input type="text" placeholder="User Email" v-model="userEmail" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">User Address</label>
      <div class="control">
        <input type="text" placeholder="User Address" v-model="userAddress" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">User Phone</label>
      <div class="control">
        <input type="text" placeholder="User Phone" v-model="userPhone" class="input" />
      </div>
    </div>

    <div class="control">
      <button class="button is-warning" @click="updateUser">UPDATE</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'userEdit',
  setup() {
    const userName = ref('')
    const userEmail = ref('')
    const userAddress = ref('')
    const userPhone = ref('')
    const router = useRouter()
    const route = useRoute()

    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${route.params.id}`)
        userName.value = response.data.response[0].user_name
        userEmail.value = response.data.response[0].user_email
        userAddress.value = response.data.response[0].user_address
        userPhone.value = response.data.response[0].user_phone
      } catch (err) {
        console.error('Error fetching user:', err)
      }
    }

    const updateUser = async () => {
      if (!userName.value || !userEmail.value || !userAddress.value || !userPhone.value) {
        alert('Please fill in all fields!')
        return
      }
      try {
        await axios.put(`http://localhost:3000/api/users/${route.params.id}`, {
          user_name: userName.value,
          user_email: userEmail.value,
          user_address: userAddress.value,
          user_phone: userPhone.value,
        })
        router.push('/')
      } catch (err) {
        console.error('Error updating user:', err)
      }
    }

    onMounted(() => {
      getUserById()
    })

    return {
      userName,
      userEmail,
      userAddress,
      userPhone,
      updateUser,
    }
  },
}
</script>

<style scoped></style>
