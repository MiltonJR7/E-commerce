
document.addEventListener('DOMContentLoaded', (event)=> {
    const btnLimpar = document.getElementById('btnLimparCampo');
    const inputCep = document.getElementById('inputCep');
    const inputCepEdit = document.getElementById('inputCepEdit');
    
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

    if(inputCepEdit) {
        inputCepEdit.addEventListener('blur', (event)=> {
            const valor = document.getElementById('inputCepEdit').value;
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
                            document.getElementById('inputRuaEdit').value=(corpo.logradouro);
                            document.getElementById('inputBairroEdit').value=(corpo.bairro);
                            document.getElementById('inputCidadeEdit').value=(corpo.localidade);
                            document.getElementById('inputEstadoEdit').value=(corpo.uf);
                        } else {
                            limpa_formulario_cep_edit()
                            alert("CEP não encontrado.");
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                        return alert('Error interno, tente novamente mais tarde.');
                    })
                } else {
                    limpa_formulario_cep_edit()
                    return alert('ERRO: CEP INVALIDO');
                }
            }
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

    function limpa_formulario_cep_edit() {
        document.getElementById('inputCepEdit').value=("");
        document.getElementById('inputRuaEdit').value=("");
        document.getElementById('inputBairroEdit').value=("");
        document.getElementById('inputCidadeEdit').value=("");
        document.getElementById('inputEstadoEdit').value=("");
        document.getElementById('inputNumeroEdit').value=("");
        document.getElementById('inputComplementoEdit').value=("");
    }
})