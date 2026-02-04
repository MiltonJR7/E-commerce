

document.addEventListener('DOMContentLoaded', ()=> {
    const btn = document.getElementById('btnSalvarProduto');
    const btnLimpar = document.getElementById('clearBtn');

    btn.addEventListener('click', addNewProduct);
    btnLimpar.addEventListener('click', limparImputs);

    function addNewProduct() {

        const nome = document.getElementById('nome');
        let descricao = document.getElementById('descricao');
        const preco = document.getElementById('preco');
        const codigoBarras = document.getElementById('codigoBarras');
        const status = document.getElementById('status');
        const categoria = document.getElementById('categoria');
        // const estoque = document.getElementById('estoque'); -- ajustar banco de dados de estoque
        let validar = [];

        if(nome.value === "") { validar.push(nome); } else { nome.style.borderColor = "#50678a"; }
        if(descricao.value === "") descricao.value = "vazio";
        if(preco.value === "") { validar.push(preco); } else { preco.style.borderColor = "#D1D5DB"; }
        if(codigoBarras.value === "") { validar.push(codigoBarras); } else { codigoBarras.style.borderColor = "#D1D5DB"; }
        if(status.value === "") { validar.push(status); } else { status.style.borderColor = "#D1D5DB"; }
        if(categoria.value === "") { validar.push(categoria); } else { categoria.style.borderColor = "#D1D5DB"; }
        // if(estoque.value === "") { validar.push(estoque); } else { estoque.style.borderColor = "#D1D5DB"; } -- ajustar banco de dados de estoque


        if(validar.length === 0) {

            let obj = {
                nome: nome.value,
                descricao: descricao.value,
                preco: preco.value,
                codigoBarras: codigoBarras.value,
                status: status.value,
                categoria: categoria.value,
                // estoque: estoque.value
            }

            fetch('/dashboard/products/add-new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then((res)=> {
                return res.json();
            })
            .then((corpo)=> {
                if(corpo.ok) {
                    window.location.reload();
                } else {
                    alert('erro em cadastro de produto!');
                }
            })

        } else {
            for(let i = 0; i < validar.length; i++) {
                validar[i].style.borderColor = "red";
            }
        }
    }

    function limparImputs() {
        const nome = document.getElementById('nome');
        const descricao = document.getElementById('descricao');
        const preco = document.getElementById('preco');
        const codigoBarras = document.getElementById('codigoBarras');
        const status = document.getElementById('status');
        const categoria = document.getElementById('categoria');
        // const estoque = document.getElementById('estoque');

        nome.value = "";
        nome.style.borderColor = "#D1D5DB";

        descricao.value = "";
        descricao.style.borderColor = "#D1D5DB";

        preco.value = "";
        preco.style.borderColor = "#D1D5DB";

        codigoBarras.value = "";
        codigoBarras.style.borderColor = "#D1D5DB";

        status.value = "";
        status.style.borderColor = "#D1D5DB";

        categoria.value = "";
        categoria.style.borderColor = "#D1D5DB";

        // estoque.value = "";
        // estoque.style.borderColor = "#D1D5DB";
    }
})