const connection = require('../database/connection');
const crypto = require('crypto');

exports.getAllSellers = async (req, res) => {
  try {
    const vendedores = await connection('VENDEDORES').select('*');
    return res.status(200).json({
      vendedores
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createSeller = async (req, res) => {
  try {
    const {
      DSNOME,
      CDTAB,
      DTNASC
    } = req.body;

    if ((!DSNOME) || (!CDTAB)) {
      return res.status(422).json({
        erros: [{
          title: 'Operação não permitida',
          detail: 'Nome e o código da tabela de preços são obrigatórios'
        }]
      });
    }

    const CDVEND = crypto.randomBytes(16).toString('HEX');

    await connection('VENDEDORES').insert({
      CDVEND,
      DSNOME,
      CDTAB,
      DTNASC
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        CDVEND: CDVEND
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getSeller = async (req, res) => {
  try {
    const CDVEND = req.params.CDVEND;
    const VENDEDOR = await connection('VENDEDORES')
      .where('CDVEND', CDVEND).select('*').first();

    if (!VENDEDOR) {
      res.status(404).json({
        status: 'fail',
        message: 'Vendedor não localizado'
      })
    } else {
      return res.status(200).json({
        VENDEDOR
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const CDVEND = req.params.CDVEND;

    await connection('VENDEDORES')
      .where('CDVEND', CDVEND).delete();

    return res.status(200).json({
      status: 'sucess',
      message: 'Vendedor foi removido com sucesso'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const CDVEND = req.params.CDVEND;
    const {
      DSNOME,
      CDTAB,
      DTNASC
    } = req.body;

    if ((!DSNOME) || (!CDTAB)) {
      return res.status(422).json({
        erros: [{
          title: 'Operação não permitida',
          detail: 'Nome e o código da tabela de preços são obrigatórios'
        }]
      });
    }

    await connection('VENDEDORES')
      .where({
        'CDVEND': CDVEND,
      })
      .update({
        DSNOME,
        CDTAB,
        DTNASC,
      })

    return res.status(200).json({
      status: 'sucess',
      message: 'Vendedor atualizado com sucesso'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
};