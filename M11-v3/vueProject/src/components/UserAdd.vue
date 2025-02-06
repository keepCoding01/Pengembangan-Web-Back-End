<!-- <template>
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
    const title = ref('')
    const note = ref('')
    const category_name = ref('')
    const color = ref('')
    const icon = ref('')
    const router = useRouter()

    const saveUser = async () => {
      if (!title.value || !note.value || !category_name.value || !color.value || !icon.value) {
        alert('Please fill in all fields!')
        return
      }
      try {
        await axios.post('http://localhost:3000/api/notes', {
          title: title.value,
          note: note.value,
          category_name: category_name.value,
          color: color.value,
          icon: icon.value,
        })
        title.value = ''
        note.value = ''
        category_name.value = ''
        color.value = ''
        icon.value = ''
        router.push('/')
      } catch (err) {
        console.error('Error saving user:', err)
      }
    }

    return {
      title,
      note,
      category_name,
      color,
      icon,
      saveUser,
    }
  },
}
</script>

<style scoped></style> -->

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
      <button class="button is-success" @click="saveUser">SAVE</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'UserEdit',
  setup() {
    const title = ref('')
    const note = ref('')
    const category_name = ref('')
    const color = ref('')
    const icon = ref('')
    const router = useRouter()

    const saveUser = async () => {
      if (!title.value || !note.value || !category_name.value || !color.value || !icon.value) {
        alert('Please fill in all fields!')
        return
      }

      try {
        // Tambahkan kategori ke tabel `categories`
        const categoryResponse = await axios.post('http://localhost:3000/api/categories', {
          category_name: category_name.value,
          color: color.value,
          icon: icon.value,
        })

        const categoryId = categoryResponse.data.data.id

        // Tambahkan catatan ke tabel `notes`
        await axios.post('http://localhost:3000/api/notes', {
          title: title.value,
          note: note.value,
          category_id: categoryId,
        })

        // Reset form
        title.value = ''
        note.value = ''
        category_name.value = ''
        color.value = ''
        icon.value = ''

        router.push('/')
      } catch (err) {
        console.error('Error saving user:', err)
      }
    }

    return {
      title,
      note,
      category_name,
      color,
      icon,
      saveUser,
    }
  },
}
</script>

<style scoped></style>
