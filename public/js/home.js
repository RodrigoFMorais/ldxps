const urlbase = "/api/v1/"

const getClients = async (CDVEND) => {
  const res = await axios({
    method: "GET",
    url: urlbase + "clientes/" + CDVEND,
  });

  var select = document.getElementById("CDCL");

  for (i = select.length - 1; i >= 0; i--) {
    select.remove(i);
  }

  for (var keys in res.data.clientes) {
    console.log(keys + "->" + res.data.clientes[keys]);
  };

  for (var i = 0; i < res.data.clientes.length; i++) {
    var opt = res.data.clientes[i];
    console.log(opt.DSNOME);
    var el = document.createElement("option");
    el.text = opt.DSNOME;
    el.value = opt.CDCL;
    select.add(el);
  }
};

const saveSeller = async (dados) => {
  try {
    const res = await axios({
      method: "POST",
      url: urlbase + "vendedores/",
      data: dados
    });
    alert('Vendedor cadastrado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Não foi possível cadastrar vendedor. Erro: ' + err);
    window.location.href = '../';
  }
};

const deleteSeller = async (CDVEND) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: urlbase + "vendedores/" + CDVEND
    });
    alert('Vendedor deletado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Impossível deletar vendedor, verifique se não há clientes associados!');
    window.location.href = '../';
  }
};

const deleteClient = async (CDCL) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: urlbase + "clientes/" + CDCL
    });
    alert('Cliente deletado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Impossível deletar cliente, verifique sua conexão com DB!');
    window.location.href = '../';
  }
};

const updateSeller = async (CDVEND, dados) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: urlbase + "vendedores/" + CDVEND,
      data: dados
    });
    alert('Vendedor atualizado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Não foi possível atualizar vendedor. Erro: ' + err);
    window.location.href = '../';
  }
};

const updateClient = async (CDCL, dados) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: urlbase + "clientes/" + CDCL,
      data: dados
    });
    alert('Cliente atualizado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Não foi possível atualizar cliente. Erro: ' + err);
    window.location.href = '../';
  }
};

const saveClient = async (dados) => {
  try {
    const res = await axios({
      method: "POST",
      url: urlbase + "clientes/",
      data: dados
    });
    alert('Cliente cadastrado com sucesso!');
    window.location.href = '../';
  } catch (err) {
    alert('Não foi possível cadastrar cliente. Erro: ' + err);
    window.location.href = '../';
  }
};

function selectClients(e) {
  getClients($(e).val());
}

function cadastrarVendedor() {
  const DSNOME = document.getElementById('DSNOME').value;
  const CDTAB = document.getElementById('CDTAB').value;
  const DTNASC = document.getElementById('DTNASC').value;

  if ((!DSNOME) || (!CDTAB))
    alert('Campo nome e código são obrigatóios');
  else if ((!DTNASC))
    saveSeller({
      DSNOME,
      CDTAB
    });
  else
    saveSeller({
      DSNOME,
      CDTAB,
      DTNASC
    });
}

function cadastrarCliente() {
  const DSNOME = document.getElementById('DSNOME').value;
  const IDTIPO = document.getElementById('IDTIPO').value;
  const CDVEND = document.getElementById('CDVEND').value;
  const DSLIN = document.getElementById('DSLIN').value;

  if ((!DSNOME) || (!IDTIPO) || (!CDVEND) || (!DSLIN))
    alert('Todos os campos são obrigatóios');
  else
    saveClient({
      DSNOME,
      IDTIPO,
      CDVEND,
      DSLIN
    });
}

function editarVendodor() {
  const CDVEND = document.getElementById('CDVEND').value;
  if (!CDVEND)
    alert('Você precisa selecionar o vendedor!');
  else
    window.location.href = '../edita' + CDVEND;
}

function editarCliente() {
  const CDCL = document.getElementById('CDCL').value;
  if (!CDCL)
    alert('Você precisa selecionar o cliente!');
  else
    window.location.href = '../editacliente/' + CDCL;
}

function atualizaVendedor() {
  const DSNOME = document.getElementById('DSNOME').value;
  const CDTAB = document.getElementById('CDTAB').value;
  const DTNASC = document.getElementById('DTNASC').value;
  const CDVEND = document.getElementById('CDVEND').value;

  if ((!DSNOME) || (!CDTAB))
    alert('Campo nome e código são obrigatóios');
  else if ((!DTNASC))
    updateSeller(CDVEND, {
      DSNOME,
      CDTAB
    });
  else
    updateSeller(CDVEND, {
      DSNOME,
      CDTAB,
      DTNASC
    });
}

function deletaVendedor() {
  const CDVEND = document.getElementById('CDVEND').value;
  deleteSeller(CDVEND);
}

function atualizaCliente() {
  const DSNOME = document.getElementById('DSNOME').value;
  const IDTIPO = document.getElementById('IDTIPO').value;
  const CDVEND = document.getElementById('CDVEND').value;
  const DSLIN = document.getElementById('DSLIN').value;
  const CDCL = document.getElementById('CDCL').value;


  if ((!DSNOME) || (!IDTIPO) || (!CDVEND) || (!DSLIN))
    alert('Campo nome e código são obrigatóios');
  else
    updateClient(CDCL, {
      DSNOME,
      IDTIPO,
      CDVEND,
      DSLIN
    });
}

function deletaCliente() {
  const CDCL = document.getElementById('CDCL').value;
  deleteClient(CDCL);
}