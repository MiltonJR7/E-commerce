
document.addEventListener('DOMContentLoaded', ()=> {
    const btnLimpar = document.getElementById('btnLimparCampo');
    const inputCep = document.getElementById('inputCep');
    btnLimpar.addEventListener('click', limpa_formulário_cep);

    inputCep.addEventListener('blur', (event)=> {
        const valor = document.getElementById('inputCep').value;
        var cep = valor.replace(/\D/g, '');

        if(cep !== "") {
            var validacep = /^[0-9]{8}$/;
            if(validacep.test(cep)) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res)=> {
                    return res.json();
                })
                .then((corpo)=> {
                    if(!corpo.erro) {
                        document.getElementById('inputRua').value=(corpo.logradouro);
                        document.getElementById('inputBairro').value=(corpo.bairro);
                        document.getElementById('inputCidade').value=(corpo.localidade);
                        document.getElementById('inputEstado').value=(corpo.uf);
                    } else {
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                })
                .catch((err)=> {
                    return alert('Error interno, tente novamente mais tarde.');
                })
            } else {
                limpa_formulário_cep();
                return alert('ERRO: CEP INVALIDO');
            }
        }
    })
    
    function limpa_formulário_cep() {
        document.getElementById('inputCep').value=("");
        document.getElementById('inputRua').value=("");
        document.getElementById('inputBairro').value=("");
        document.getElementById('inputCidade').value=("");
        document.getElementById('inputEstado').value=("");
        document.getElementById('inputNumero').value=("");
        document.getElementById('inputComplemento').value=("");
    }
})