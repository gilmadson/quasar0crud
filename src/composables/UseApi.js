import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (err) {
      throw new Error(err)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (err) {
      throw new Error(err)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (err) {
      throw new Error(err)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (err) {
      throw new Error(err)
    }
  }

  const EntregarCartao = async (id) => {
    try {
      const form = getById(id)
      form.ativado = 'n'
      const { data } = await api.put(`${url}/${form.id}`, form)
      //      data.value.ativado = 'n'
      return data
    } catch (err) {
      throw new Error(err)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (err) {
      throw console.log(err)
    }
  }

  return {
    list,
    post,
    update,
    remove,
    getById,
    EntregarCartao
  }
}
