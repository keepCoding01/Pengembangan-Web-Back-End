<template>
  <div>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input type="text" placeholder="Title" v-model="title" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Note</label>
      <div class="control">
        <input type="text" placeholder="Note" v-model="note" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Category Name</label>
      <div class="control">
        <input type="text" placeholder="Category Name" v-model="category_name" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Color</label>
      <div class="control">
        <input type="text" placeholder="Color" v-model="color" class="input" />
      </div>
    </div>

    <div class="field">
      <label class="label">Icon</label>
      <div class="control">
        <input type="text" placeholder="Icon" v-model="icon" class="input" />
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
    const title = ref('')
    const note = ref('')
    const category_name = ref('')
    const color = ref('')
    const icon = ref('')
    const category_id = ref('')
    const router = useRouter()
    const route = useRoute()

    const getUserById = async () => {
      try {
        const response1 = await axios.get(`http://localhost:3000/api/notes/${route.params.id}`)
        const response2 = await axios.get(`http://localhost:3000/api/categories/${route.params.id}`)
        const noteData = response1.data.data[0]
        const categoryData = response2.data.data[0]

        if (noteData) {
          title.value = noteData.title
          note.value = noteData.note
          category_name.value = categoryData.category_name || ''
          color.value = categoryData.color || ''
          icon.value = categoryData.icon || ''
          category_id.value = categoryData.id || null
        }
      } catch (err) {
        console.error('Error fetching user:', err)
      }
    }

    const updateUser = async () => {
      if (!title.value || !note.value || !category_name.value || !color.value || !icon.value) {
        alert('Please fill in all fields!')
        return
      }
      try {
        await axios.put(`http://localhost:3000/api/notes/${route.params.id}`, {
          title: title.value,
          note: note.value,
          category_id: category_id.value,
          category_name: category_name.value,
          color: color.value,
          icon: icon.value,
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
      title,
      note,
      category_name,
      color,
      icon,
      updateUser,
    }
  },
}
</script>

<style scoped></style>
