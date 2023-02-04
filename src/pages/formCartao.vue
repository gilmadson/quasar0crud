<template lang="">
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-sm"
    >

      <q-input
        outined
        v-model="formCartao.Nome"
        label="Nome Completo *"
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

      <q-input
        outined
        v-model="formCartao.Cartao"
        label="Nº do Cartão"
        mask="#### - #### - #### - ####"
        fill-mask="#"
        unmasked-value
        class="col-lg-6 col-xs-12"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

      <q-input
        outined
        v-model="formCartao.Nis"
        label="NIS"
        mask="#########-#"
        fill-mask="#"
        unmasked-value
        lazy-rules
        class="col-lg-6 col-xs-12"
      />

      <q-input
        outined
        v-model="formCartao.Ag"
        label="Agência"
        mask="####"
        fill-mask="#"
        unmasked-value
        lazy-rules
        class="col-lg-6 col-xs-2"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

      <q-input
        outined
        v-model="formCartao.Op"
        label="Operação/Produto"
        mask="####"
        fill-mask="#"
        unmasked-value
        lazy-rules
        class="col-lg-6 col-xs-4"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

      <q-input
        outined
        v-model="formCartao.Conta"
        label="Conta *"
        class="col-lg-6 col-xs-6"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />

    <div class="col-12 q-gutter-sm">
      <q-btn
        label="Salvar"
        color="primary"
        class="float-right"
        icon="save"
        type="submit" />
      <q-btn
        label="Cancelar"
        color="white"
        class="float-right"
        text-color="primary"
        :to="{name: 'home'}" />
        <q-btn
        label="Entregar"
        color="brown-5"
        class="float-right"
        text-color="secundarys"
        :to="{name: 'home'}"
        @click="Entrega"/>
    </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormCartao',
  setup () {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()

    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id)
      }
    })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        formCartao.value = response
      } catch (e) {
        alert(e)
      }
    }

    const formCartao = ref({
      Nome: '',
      Cartao: '',
      Nis: '',
      Ag: '2778',
      Op: '',
      Conta: '',
      ativado: 's',
      data_cricao: Date.now()
    })

    const Entrega = () => {
      formCartao.value.ativado = 'n'
      alert(formCartao.value.ativado)
      onSubmit()
    }

    const onSubmit = async () => {
      try {
        if (formCartao.value.id) {
          await update(formCartao.value)
          console.log('Alterado do com Sucesso')
        } else {
          await post(formCartao.value)
          $q.notify({ message: 'Cadastro do com Sucesso', icon: 'check', color: 'positive' })
          console.log('Cadastro do com Sucesso')
        }
        router.push({ name: 'home' })
        console.log('conclui tudo')
      } catch (e) {
        console.log(e)
      }
    }

    return {
      formCartao,
      onSubmit,
      Entrega
    }
  }

})

</script>
<style lang="">

</style>
