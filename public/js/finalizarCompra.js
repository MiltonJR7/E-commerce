document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const sumarryItens = document.getElementById('listaValores');
    const btnFinalizar = document.getElementById('btn-continue');
    const btnPagamento = document.getElementById('btn-pagamento');
    const btnVoltar = document.getElementById('btn-back');
    const parts = window.location.pathname.split("/");
    const idParams = Number(parts[parts.length - 1]);

    let id = null;

    if (btnFinalizar) {
        exibirProdutos();
        exibirTotal();

        btnFinalizar.addEventListener('click', () => {
            const input = document.querySelector('[data-address-id]');

            if (!input) {
                console.error('Elemento com data-address-id não encontrado');
                finishOrder();
                return;
            }

            id = input.dataset.addressId;

            iniciarProcessoCompra();
        });
    }

    if (btnPagamento) {
        exibirTotal();
        definirParcelas();

        btnPagamento.addEventListener('click', () => {
            enviarDadosBack();
        });
    }

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            goToCheckoutStep();
        });
    }

    function iniciarProcessoCompra() {
        if (id) {
            goToPaymentStep();
        } else {
            finishOrder();
        }
    }

    function exibirProdutos() {
        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) return;

        const objeto = JSON.parse(carrinhoStorage);

        let html = "";

        for (let i = 0; i < objeto.length; i++) {
            const item = objeto[i];

            html += `
                <div class="product-item">
                    <img src="${item.imagem}" alt="${item.nome}" class="product-image">
                    
                    <div class="product-info">
                        <h3 class="product-name">${item.nome}</h3>
                        <p class="product-quantity">${item.quantidade}</p>
                    </div>

                    <div class="product-price-container">
                        <p class="product-price">
                            ${(item.preco).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </p>
                        <p class="product-unit-price">
                            ${(item.preco).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })} cada
                        </p>
                    </div>
                </div>
            `;
        }

        productList.innerHTML = html;
    }

    function exibirTotal() {
        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) return;

        const objeto = JSON.parse(carrinhoStorage);

        let preco = 0;
        let quantidadeTotal = 0;

        for (let i = 0; i < objeto.length; i++) {
            preco += objeto[i].preco * objeto[i].quantidade;
            quantidadeTotal += objeto[i].quantidade;
        }
        
        let frete = quantidadeTotal * 29.90;
        const precoComFrete = preco + frete;

        sumarryItens.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">
                    ${(preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </div>

            <div class="summary-item">
                <span class="summary-label">Frete</span>
                <span class="summary-value">
                    ${(frete).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </div>

            <div class="summary-total">
                <span class="summary-total-label">Total</span>
                <span class="summary-total-value">
                    ${(precoComFrete).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </div>
        `;
    }

    function successOrder() {
        return new Promise((resolve) => {
            const confirmation = document.createElement('div');

            confirmation.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s ease-in;
                ">
                    <div style="
                        background: white;
                        padding: 2rem;
                        border-radius: 12px;
                        max-width: 400px;
                        text-align: center;
                        animation: slideInRight 0.4s ease-out;
                    ">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: #88E788;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 1rem;
                        ">
                            <i class="bi bi-check-lg" style="color: white; font-size: 2rem;"></i>
                        </div>

                        <h3>Pedido realizado com sucesso!</h3>

                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Sua compra está sendo processada.
                            Você pode acompanhar tudo na sua área do usuário.
                        </p>

                        <button class="btn btn-success" id="closeModal">
                            Fechar
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(confirmation);
            const btn = confirmation.querySelector('#closeModal');
            btn.addEventListener('click', () => {
                confirmation.remove();
                resolve()
            });
        });
    }

    async function finishOrder() {
        const confirmation = document.createElement('div');
        confirmation.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease-in;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 400px;
                    text-align: center;
                    animation: slideInRight 0.4s ease-out;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: #ef4444;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                    ">
                        <i class="bi bi-x-lg" style="color: white; font-size: 2rem;"></i>
                    </div>

                    <h3 style="color: #1f2937; margin-bottom: 0.5rem;">
                        Necessario um endereço!
                    </h3>

                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Ocorreu um erro ao processar sua solicitação.
                        Adicione um endereco para continuar.
                    </p>

                    <button class="btn btn-danger" onclick="this.closest('div').parentElement.remove()">
                        Fechar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmation);
    }

    async function errorOrder() {
        const confirmation = document.createElement('div');
        confirmation.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease-in;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 400px;
                    text-align: center;
                    animation: slideInRight 0.4s ease-out;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: #ef4444;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                    ">
                        <i class="bi bi-x-lg" style="color: white; font-size: 2rem;"></i>
                    </div>

                    <h3 style="color: #1f2937; margin-bottom: 0.5rem;">
                        Pagamento estornado!
                    </h3>

                    <p style="color: #6b7280; margin-bottom: 1.5rem;">
                        Ocorreu um erro ao processar sua solicitação.
                        Tente novamente mais tarde.
                    </p>

                    <button class="btn btn-danger" onclick="this.closest('div').parentElement.remove()">
                        Fechar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmation);
    }

    function definirParcelas() {
        const parcelas = document.getElementById('parcelas');
        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) return;

        const objeto = JSON.parse(carrinhoStorage);
        let preco = 0;
        let quantidadeTotal = 0;

        for (let i = 0; i < objeto.length; i++) {
            preco += objeto[i].preco * objeto[i].quantidade;
            quantidadeTotal += objeto[i].quantidade;
        }
        
        let frete = quantidadeTotal * 29.90;
        const precoComFrete = preco + frete;


        let opcoes = "";

        for(let i = 1; i < 13; i++) {
            opcoes += 
            `
            <option value="${i}">${i}x de 
                ${(precoComFrete/i).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            `
        }

        parcelas.innerHTML = `
            <label class="form-label">Parcelas</label>
            <select class="form-select" id="parcelas">
                ${opcoes}
            </select>
        `
    }

    function goToPaymentStep() {
        window.location.href = `/shop/payment/${idParams}`;
    }

    function goToCheckoutStep() {
        window.location.href = `/shop/checkout/${idParams}`;
    }

    function enviarDadosBack() {
        const carrinhoStorage = localStorage.getItem('carrinho');
        if (!carrinhoStorage) return;
        let produtos = JSON.parse(carrinhoStorage);
        const methods = document.querySelectorAll('.payment-method');
        let methodPayment = "credit";
        let verify = false;

        methods.forEach(method => {
            method.addEventListener('click', () => {
                methodPayment = method.dataset.method;
            });
        });

        if(methodPayment === "credit") verify = creditPayment();

        if(verify === true) {
            const payload = {
                carrinho: produtos,
                pagamento: methodPayment,
                usuarioID: idParams
            }
            
            fetch(`/shop/payment/${idParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then((res)=> {
                return res.json();
            })
            .then(async (corpo)=> {
                if(corpo.ok) {
                    await successOrder();
                    localStorage.clear();
                    window.location.href = "/";
                } else {
                    errorOrder();
                }
            });
        }
    }

    function creditPayment() {
        const numero = document.getElementById('card-number');
        const nome = document.getElementById('card-name');
        const validade = document.getElementById('card-exp');
        const cvv = document.getElementById('card-cvv');

        const regexNome = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/;
        const regexCard = /^\d{13,19}$/;
        const regexValidade = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const regexCVV = /^\d{3,4}$/;
        const numeroLimpo = numero.value.replace(/\D/g, '');
        let listaValidar = [];

        if (!regexNome.test(nome.value)) { listaValidar.push(nome); } else { nome.style.borderColor = "#E5E7EB"; }
        if (!regexCard.test(numeroLimpo)) { listaValidar.push(numero); } else { numero.style.borderColor = "#E5E7EB"; }
        if (!regexValidade.test(validade.value)) { listaValidar.push(validade); } else { validade.style.borderColor = "#E5E7EB"; }
        if (!regexCVV.test(cvv.value)) { listaValidar.push(cvv); } else { cvv.style.borderColor = "#E5E7EB"; }

        if(listaValidar.length == 0) {
            return true;
        } else {    
            for(let i = 0; i < listaValidar.length; i++) {
                listaValidar[i].style.borderColor = "rgba(253, 144, 144, 0.87)";
            }
            return false;
        }
    }
});