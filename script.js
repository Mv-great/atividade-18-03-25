const itensMenu = [
    { id: 1, nome: "Hambúrguer Clássico", descricao: "Delicioso hambúrguer com queijo e bacon.", preco: 25.00, imagem: "download (1).jpg", categoria: "todos" },
    { id: 2, nome: "Pizza Margherita", descricao: "Pizza com mussarela, tomate e manjericão.", preco: 30.00, imagem: "pizza-caseira-lucas-alencar.webp", categoria: "vegetariano" },
    { id: 3, nome: "Salada Caesar", descricao: "Salada com frango grelhado e molho Caesar.", preco: 20.00, imagem: "download.jpg", categoria: "sem-gluten" },

];

let carrinho = [];

function criarItemMenu(prato) {
    return `
        <div class="item-menu">
            <img src="${prato.imagem}" alt="${prato.nome}">
            <h3>${prato.nome}</h3>
            <p>${prato.descricao}</p>
            <span class="preco">R$ ${prato.preco.toFixed(2)}</span>
            <button aria-label="Adicionar ${prato.nome} ao carrinho" data-id="${prato.id}">Adicionar</button>
        </div>
    `;
}

function renderizarItensMenu(itens) {
    const itensMenuDiv = document.getElementById("itens-menu");
    itensMenuDiv.innerHTML = "";
    itens.forEach(prato => {
        itensMenuDiv.innerHTML += criarItemMenu(prato);
    });
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");
    listaCarrinho.innerHTML = "";
    let total = 0;
    carrinho.forEach((item, index) => {
        listaCarrinho.innerHTML += `
            <li>
                ${item.nome} - R$ ${item.preco.toFixed(2)}
                <button class="remover-item" data-index="${index}">Remover</button>
            </li>
        `;
        total += item.preco;
    });
    totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

document.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        if (event.target.classList.contains("remover-item")) {
            const index = parseInt(event.target.dataset.index);
            carrinho.splice(index, 1);
            atualizarCarrinho();
        } else {
            const id = parseInt(event.target.dataset.id);
            const prato = itensMenu.find(item => item.id === id);
            if (prato) {
                carrinho.push(prato);
                atualizarCarrinho();
            }
        }
    }
});

document.getElementById("filtros").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const categoria = event.target.dataset.categoria;
        let itensFiltrados;
        if (categoria === "todos") {
            itensFiltrados = itensMenu;
        } else {
            itensFiltrados = itensMenu.filter(item => item.categoria === categoria);
        }
        renderizarItensMenu(itensFiltrados);
    }
});

renderizarItensMenu(itensMenu);
atualizarCarrinho();