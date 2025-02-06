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
      <button class="button is-success" @click="saveUser">SAVE</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'userAdd',
  setup() {
    const userName = ref('')
    const userEmail = ref('')
    const userAddress = ref('')
    const userPhone = ref('')
    const router = useRouter()

    const saveUser = async () => {
      if (!userName.value || !userEmail.value || !userAddress.value || !userPhone.value) {
        alert('Please fill in all fields!')
        return
      }
      try {
        await axios.post('http://localhost:3000/api/users', {
          user_name: userName.value,
          user_email: userEmail.value,
          user_address: userAddress.value,
          user_phone: userPhone.value,
        })
        userName.value = ''
        userEmail.value = ''
        userAddress.value = ''
        userPhone.value = ''
        router.push('/')
      } catch (err) {
        console.error('Error saving user:', err)
      }
    }

    return {
      userName,
      userEmail,
      userAddress,
      userPhone,
      saveUser,
    }
  },
}
</script>

<style scoped></style>
