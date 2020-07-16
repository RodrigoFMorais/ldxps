const connection = require('../database/connection');
const crypto = require('crypto');

exports.getAllClients = async (req, res) => {
  try {
    const clientes = await connection('CLIENTES').select('*');
    return res.status(200).json({
      clientes
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createClient = async (req, res) => {
  try {
    const {
      DSNOME,
      IDTIPO,
      CDVEND,
      DSLIN
    } = req.body;


    if ((!DSNOME) || (!CDVEND) || (!DSLIN)) {
      return res.status(422).json({
        erros: [{
          title: 'Operação não permitida',
          detail: 'Nome do cliente, código do vendedor e limite de crédito são obrigatórios!'
        }]
      });
    }

    const CDCL = crypto.randomBytes(16).toString('HEX');

    await connection('CLIENTES').insert({
      CDCL,
      DSNOME,
      IDTIPO,
      CDVEND,
      DSLIN
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        CDCL: CDCL
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getClient = async (req, res) => {
  try {
    const CDCL = req.params.CDCL;
    const CLIENTE = await connection('CLIENTES')
      .where('CDCL', CDCL).select('*').first();

    if (!CLIENTE) {
      res.status(404).json({
        status: 'fail',
        message: 'Cliente não localizado!'
      })
    } else {
      return res.status(200).json({
        CLIENTE
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const CDCL = req.params.CDCL;
    const CLIENTE = await connection('CLIENTES')
      .where('CDCL', CDCL).select('*').first();

    if (!CLIENTE) {
      return res.status(422).json({
        erros: [{
          status: 'fail',
          detail: 'Cliente não existe'
        }]
      });
    };

    await connection('CLIENTES')
      .where('CDCL', CDCL).delete();

    return res.status(200).json({
      status: 'sucess',
      message: 'Cliente foi removido com sucesso!'
    });


  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.updateClient = async (req, res) => {
  try {
    const CDCL = req.params.CDCL;
    const {
      DSNOME,
      IDTIPO,
      CDVEND,
      DSLIN
    } = req.body;

    if ((!DSNOME) || (!CDVEND) || (!DSLIN)) {
      return res.status(422).json({
        erros: [{
          title: 'Operação não permitida',
          detail: 'Nome do cliente, código do vendedor e limite de crédito são obrigatórios!'
        }]
      });
    }

    await connection('CLIENTES')
      .where({
        'CDCL': CDCL,
      })
      .update({
        DSNOME,
        IDTIPO,
        CDVEND,
        DSLIN
      })

    return res.status(200).json({
      status: 'sucess',
      message: 'Cliente atualizado com sucesso!'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getClientSeller = async (req, res) => {
  try {
    const CDVEND = req.params.CDVEND;
    const clientes = await connection('CLIENTES')
      .where('CDVEND', CDVEND).select('*');

    if (!clientes) {
      res.status(404).json({
        status: 'fail',
        message: 'Vendedor não possui clientes ainda!'
      })
    } else {
      return res.status(200).json({
        clientes
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};