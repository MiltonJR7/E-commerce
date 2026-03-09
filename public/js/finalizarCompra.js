
document.addEventListener('DOMContentLoaded', ()=> {
    const productList = document.getElementById('productList');
    const sumarryItens = document.getElementById('listaValores');
    const btnFinalizar = document.getElementById('btn-continue');
    const addressSection = document.getElementById('address-section');
    const paymentSection = document.getElementById('payment-section');
    
    let currentStep = 2;

    if(btnFinalizar) {
        btnFinalizar.addEventListener('click', iniciarProcessoCompra);

        function iniciarProcessoCompra() {
            const addressValue = document.getElementById("addressID").dataset.productId;

            if(addressValue !== undefined) {
                goToPaymentStep();
            } else {
                finishOrder();
            }
        }
    }

    if(productList || sumarryItens) {
        const carrinhoStorage = localStorage.getItem('carrinho');
        const objeto = JSON.parse(carrinhoStorage);

        let html = "";
        let htmlTotalCompra = "";
        let preco = 0;
        let precoComFrete = 0;

        for(let i = 0; i < objeto.length; i++) {
            const item = objeto[i];
            preco += objeto[i].preco * objeto[i].quantidade;

            html += `
                <div class="product-item">
                    <img src="${item.imagem}"
                            alt="${item.nome}"
                            class="product-image">
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
            `
            productList.innerHTML = html;
        }

        precoComFrete = preco + 29.90;

        htmlTotalCompra += `
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
                <span class="summary-value">R$ 29,90</span>
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
        `
        sumarryItens.innerHTML = htmlTotalCompra;
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

    function goToPaymentStep() {
        currentStep = 3;

        addressSection.classList.remove('fade-in');
        addressSection.classList.add('d-none');

        paymentSection.classList.remove('d-none');
        paymentSection.classList.add('slide-in-right');

        setTimeout(() => {
            paymentSection.classList.remove('slide-in-right');
        }, 400);

        updateStepIndicator();

        btnFinalizar.innerHTML = 'Finalizar Compra';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function goToAddressStep() {
        currentStep = 2;

        paymentSection.classList.remove('fade-in');
        paymentSection.classList.add('d-none');

        addressSection.classList.remove('d-none');
        addressSection.classList.add('slide-in-left');

        setTimeout(() => {
            addressSection.classList.remove('slide-in-left');
        }, 400);

        updateStepIndicator();

        btnFinalizar.innerHTML = 'Continuar para Pagamento';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    btnFinalizar.addEventListener('click', () => {
        if (currentStep === 2) {
            goToPaymentStep();
        } else if (currentStep === 3) {
            finishOrder();
        }
    });
})