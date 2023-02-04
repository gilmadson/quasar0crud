class Cartao {
  constructor (id, Nome, Nis, Cartao, Ag, Op, Conta, Ativado, Data_Cricao) {
    this.id = id,
    this.Nome = Nome
    this.Nis = Nis
    this.Cartao = Cartao
    this.Ag = Ag
    this.Op = Op
    this.Conta = Conta
    this.ativado = Ativado
    // eslint-disable-next-line camelcase
    this.Data_Cricao = Data_Cricao
  }
}

module.exports = Cartao
