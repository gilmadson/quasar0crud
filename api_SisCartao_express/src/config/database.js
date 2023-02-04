'user strict'
module.exports = {

  server: 'PE7466SR091',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'sr2642'
    }
  },
  options: {
    port: 1433,
    database: 'T',
    // umas das principais mudanças
    trustServerCertificate: true,
    // umas das principais mudanças
    encrypt: false,
    rowCollectionOnRequestCompletion: true
    // umas das principais mudanças
    /* cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    } */
  }
}
