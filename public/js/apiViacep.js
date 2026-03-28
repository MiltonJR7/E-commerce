
document.addEventListener('DOMContentLoaded', (event)=> {
    const btnLimpar = document.getElementById('btnLimparCampo');
    const inputCep = document.getElementById('inputCep');
    const acoes = document.querySelectorAll('.inputCepEdit');
    
    btnLimpar.addEventListener('click', limpa_formulario_cep);
    if(inputCep) {
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
                            limpa_formulario_cep();
                            alert("CEP não encontrado.");
                        }
                    })
                    .catch((err)=> {
                        return alert('Error interno, tente novamente mais tarde.');
                    })
                } else {
                    limpa_formulario_cep();
                    return alert('ERRO: CEP INVALIDO');
                }
            }
        })
    }

    if(acoes) {
        acoes.forEach(acao => {
            acao.addEventListener('blur', (event)=> {
                const valor = acao.value;
                var cepEdit = valor.replace(/\D/g, '');

                if(cepEdit !== "") {
                    var validacep = /^[0-9]{8}$/;
                    if(validacep.test(cepEdit)) {
                        fetch(`https://viacep.com.br/ws/${cepEdit}/json/`)
                        .then((res)=> {
                            return res.json();
                        })
                        .then((corpo)=> {
                            if(!corpo.erro) {
                                const container = event.target.closest('.edit-addr-container');
                                container.querySelector('.inputRuaEdit').value = corpo.logradouro;
                                container.querySelector('.inputBairroEdit').value = corpo.bairro;
                                container.querySelector('.inputCidadeEdit').value = corpo.localidade;
                                container.querySelector('.inputEstadoEdit').value = corpo.uf;
                            } else {
                                alert("CEP não encontrado.");
                            }
                        })
                        .catch((err)=> {
                            console.log(err);
                            return alert('Error interno, tente novamente mais tarde.');
                        })
                    } else {
                        return alert('ERRO: CEP INVALIDO');
                    } 
                }
            })
        })
    }
    
    function limpa_formulario_cep() {
        document.getElementById('inputCep').value=("");
        document.getElementById('inputRua').value=("");
        document.getElementById('inputBairro').value=("");
        document.getElementById('inputCidade').value=("");
        document.getElementById('inputEstado').value=("");
        document.getElementById('inputNumero').value=("");
        document.getElementById('inputComplemento').value=("");
    }
})