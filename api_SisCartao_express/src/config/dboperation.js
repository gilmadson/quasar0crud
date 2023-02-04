const config = require('./database')
const sql = require('mssql')

async function getdata () {
  try {
    // eslint-disable-next-line no-unused-vars
    const pool = await sql.connect(config)
    console.log('sql server connected...')
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

async function getdataQuery () {
  try {
    const pool = await sql.connect(config)
    const res = await pool.request().query('SELECT *  FROM [T].[dbo].[tb_Cartao] where ativado = \'s\' ')
    return res.recordsets
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

async function getdatabyId (cartaoId) {
  try {
    const pool = await sql.connect(config)
    const res = await pool.request()
      .input('input_parameter', sql.Int, cartaoId)
      .query('SELECT * FROM [T].[dbo].[tb_Cartao] WHERE id = @input_parameter')
    return res.recordset
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

async function addCartao (crt) {
  try {
    const pool = await sql.connect(config)
    const res = await pool.request()
      .input('Nome', sql.NVarChar, crt.Nome)
      .input('Nis', sql.NVarChar, crt.Nis)
      .input('Cartao', sql.NVarChar, crt.Cartao)
      .input('Ag', sql.NVarChar, crt.Ag)
      .input('Op', sql.NVarChar, crt.Op)
      .input('Conta', sql.NVarChar, crt.Conta)
      .input('ativado', sql.NChar, crt.ativado)
      .input('Data_cricao', sql.DateTime, crt.Data_Cricao)
      .query('INSERT INTO [dbo].[tb_Cartao] ([Nome],[Nis] ,[Cartao] ,[Ag] ,[Conta] ,[ativado] ,[Data_Cricao],[Op]) VALUES (@Nome, @Nis, @Cartao, @Ag, @Conta, @ativado, @Data_Cricao, @Op)')
    console.log('Concluido ' + res.recordsets)
    return res.recordsets
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

async function apagarCartao (cartaoId) {
  try {
    const pool = await sql.connect(config)
    const res = await pool.request()
      .input('input_parameter', sql.Int, cartaoId)
      .query('DELETE FROM [dbo].[tb_Cartao] where ID = @input_parameter')
    return res.recordsets
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

async function alterarCartao (crt, id) {
  try {
    const pool = await sql.connect(config)
    const res = await pool.request()
      .input('Nome', sql.NVarChar, crt.Nome)
      .input('Nis', sql.NVarChar, crt.Nis)
      .input('Cartao', sql.NVarChar, crt.Cartao)
      .input('Ag', sql.NVarChar, crt.Ag)
      .input('Op', sql.NVarChar, crt.Op)
      .input('Conta', sql.NVarChar, crt.Conta)
      .input('ativado', sql.NChar, crt.ativado)
      .input('Data_cricao', sql.DateTime, crt.Data_Cricao)
      .input('Id', sql.Int, id)
      .query('UPDATE [dbo].[tb_Cartao] SET [Nome] = @Nome ,[Nis] = @Nis ,[Cartao] = @Cartao, [Ag] = @Ag, [Conta] = @Conta, [ativado] = @ativado, [Data_Cricao] = @Data_Cricao, [Op] = @Op WHERE Id = @Id')
    return res.recordsets
  } catch (error) {
    console.log(' Gil-error :' + error)
  }
}

module.exports = {
  getdata,
  getdataQuery,
  getdatabyId,
  addCartao,
  apagarCartao,
  alterarCartao
}
