import useApi from 'src/composables/UseApi'

export default function postService () {
  const { list, post, update, remove, getById, EntregaCartao } = useApi('posts')

  return {
    list,
    post,
    update,
    remove,
    getById,
    EntregaCartao
  }
}
