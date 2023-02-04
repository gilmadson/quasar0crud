<template>
  <q-page padding>
   <q-table
      ref="tableRef"
      title="Cartões"
      :rows="posts"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      row-key="name"
    >
    <template v-slot:top  >
        <span class="text-h5">Cartões</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{name:'formCartao' }" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter" placeholder="Procurar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click='handleEditPost(props.row.id)' />
          <q-btn icon="delete" color="negative" dense size="sm" @click='handleDeletePost(props.row.id)' />
          <!--<q-btn square color="brown-5" icon="directions" dense size="sm" @click='handleEntregaPost(props.row.id, props.row)' />-->
        </q-td>
      </template>
    </q-table>
   </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const tableRef = ref()
    const posts = ref([])
    const filter = ref('')
    const loading = ref(false)
    const { list, remove, EntregaCartao } = postsService()
    const columns = [
      { name: 'id', field: 'id', label: 'id', required: 'true', sortable: true, align: 'left' },
      { name: 'Nome', field: 'Nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'Cartao', field: 'Cartao', label: 'Cartao', sortable: true, align: 'left' },
      { name: 'Nis', field: 'Nis', label: 'NIS', sortable: true, align: 'left' },
      { name: 'Ag', field: 'Ag', label: 'Agência', sortable: true, align: 'left' },
      { name: 'Op', field: 'Op', label: 'Produto', sortable: true, align: 'left' },
      { name: 'Conta', field: 'Conta', label: 'Conta', sortable: true, align: 'left' },
      { name: 'ativado', field: 'ativado', label: 'ativado', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ]

    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (e) {

      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja Deletar este cartão?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'apagado com sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (e) {
        $q.notify({ message: 'Erro ao apagar cartão', icon: 'info', color: 'negative' })
      }
    }

    const handleEditPost = async (id) => {
      router.push({ name: 'formCartao', params: { id } })
    }

    const handleEntregaPost = async (id) => {
      try {
        $q.dialog({
          title: 'Entregar',
          message: 'Deseja Entrgar este cartão?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await EntregaCartao(id)
          $q.notify({ message: 'Cartão Entregue com Sucesso', icon: 'check', color: 'positive' })
          await getPosts()
        })
      } catch (e) {
        $q.notify({ message: 'Erro ao Entregar cartão', icon: 'info', color: 'negative' })
      }
    }

    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost,
      handleEntregaPost,
      tableRef,
      filter,
      loading
    }
  }
})
</script>
