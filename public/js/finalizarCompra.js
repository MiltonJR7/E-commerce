document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const sumarryItens = document.getElementById('listaValores');
    const btnFinalizar = document.getElementById('btn-continue');
    const btnPagamento = document.getElementById('btn-pagamento');
    const btnVoltar = document.getElementById('btn-back');

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
            iniciarProcessoCompra();
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

    function finishOrder() {
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

        parcelas.innerHTML = `
        <label class="form-label">Parcelas</label>
        <select class="form-select" id="parcelas">
            <option>1x de 
                ${(precoComFrete).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>2x de 
                ${(precoComFrete/2).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>3x de 
                ${(precoComFrete/3).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>4x de 
                ${(precoComFrete/4).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>5x de 
                ${(precoComFrete/5).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>6x de 
                ${(precoComFrete/6).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>7x de 
                ${(precoComFrete/7).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>8x de 
                ${(precoComFrete/8).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>9x de 
                ${(precoComFrete/9).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>10x de 
                ${(precoComFrete/10).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>11x de 
                ${(precoComFrete/11).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
            <option>12x de 
                ${(precoComFrete/12).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            sem juros</option>
        </select>
        `
    }

    function goToPaymentStep() {
        window.location.href = "/payment";
    }

    function goToCheckoutStep() {
        window.location.href = "/checkout";
    }
});