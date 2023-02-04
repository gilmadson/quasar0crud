import dbConfig from './dbConfig'
import sql from 'mssql'

async function getData () {
  try {
    console.log(' Inicializar banco')
    const pool = await sql.connect(dbConfig)
    console.log(' tentando conenctar')
    console.log(pool.connection)
    console.log(' banco Conectado')
  } catch (e) {
    console.log(' Erro ao cadastarar')
  }
}

module.export = {
  getData
}
