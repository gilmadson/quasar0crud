<template>
  <q-page padding>
   <q-table
      title="Cartões"
      :rows="posts"
      :columns="columns"
      row-key="name"
    />
   </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])

    const columns = [
      { name: 'id', field: 'id', label: 'id', requerid: 'true', sortable: true, align: 'left' },
      { name: 'Nome', field: 'Nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'cartao', field: 'cartao', label: 'cartao', sortable: true, align: 'left' },
      { name: 'NIS', field: 'NIS', label: 'NIS', sortable: true, align: 'left' },
      { name: 'Ag', field: 'Ag', label: 'Agência', sortable: true, align: 'left' },
      { name: 'op', field: 'op', label: 'Produto', sortable: true, align: 'left' },
      { name: 'conta', field: 'conta', label: 'Conta', sortable: true, align: 'left' },
      { name: 'a-ztivado', field: 'a-ztivado', label: 'Ativado', sortable: true, align: 'left' },
      { name: 'data_criacao', field: 'data_criacao', label: 'Data Inclusão', sortable: true, align: 'left' }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const { data } = await api.get('posts')
        posts.value = data
      } catch (e) {

      }
    }

    return {
      posts,
      columns
    }
  }
})
</script>
