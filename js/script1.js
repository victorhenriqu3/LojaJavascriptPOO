class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerdados();

    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
      this.cancelar();
      this.listatabela();
    }
  }

  listatabela() {
    let tableBody = document.querySelector(".tableContent");
    tableBody.innerText = "";
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tableBody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].name;
      td_valor.innerText = this.arrayProdutos[i].preco;

      td_acoes.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.classList.add("icon");
      imgEdit.src = "img/edit_icon.svg";
      imgEdit.setAttribute(
        "onclick",
        "produto.preparaEditar(" + JSON.stringify(this.arrayProdutos[i]) + ");"
      );

      let imgDelete = document.createElement("img");
      imgDelete.classList.add("icon");
      imgDelete.src = "img/trash_icon.svg";
      imgDelete.setAttribute(
        "onclick",
        "produto.deletar(" + this.arrayProdutos[i].id + ");"
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }

  lerdados() {
    let produto = {};
    produto.id = this.id;
    produto.name = document.getElementById("produto").value;
    produto.preco = document.getElementById("Valor").value;

    return produto;
  }

  validaCampos(produto) {
    let msg = "";

    if (produto.name === "") {
      msg += " - Informe o nome do Produto.\n";
    }
    if (produto.preco === "") {
      msg += " - Informe o nome do Produto.";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  adicionar(produto) {
    produto.preco = parseFloat(produto.preco);
    this.arrayProdutos.push(produto);
    this.id++;
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].name = produto.name;
        this.arrayProdutos[i].preco = produto.preco;
      }
    }
  }

  cancelar() {
    document.getElementById("produto").value = "";
    document.getElementById("Valor").value = "";
    document.getElementById("btn1").innerText = "Salvar";
    this.editId = null
  }

  deletar(id) {
    let tableBody = document.querySelector(".tableContent");
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos.splice(i, 1);
        tableBody.deleteRow(i);
      }
    }
  }

  preparaEditar(produto) {
    this.editId = produto.id;

    document.getElementById("produto").value = produto.name;
    document.getElementById("Valor").value = produto.preco;

    document.getElementById("btn1").innerText = "Atualizar";
  }
}

let produto = new Produto();
