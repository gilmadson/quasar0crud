import dbConfig from './dbConfig'
import sql from 'mssql'

async function getData () {
  try {
    const pool = await sql.connect(dbConfig)
    console.log(pool.connection)
  } catch (e) {
    console.log(' Erro ao cadastarar')
  }
}

module.export = {
  getData
}
