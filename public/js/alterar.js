

document.addEventListener('DOMContentLoaded', ()=> {

    const btn = document.getElementById('btnAlterar');
    const phoneInput = document.getElementById('telefone');
    const acoes = document.querySelectorAll('.salvarAlteracao');
    let idAddress = 0;
    let isSubmitting = false;

    btn.addEventListener('click', alterarDados);
    phoneInput.addEventListener('input', (e)=> {
        e.target.value = formatPhone(e.target.value);
    })

    function formatPhone(str) {
        const regex = /^(55)?(?:([1-9]{2})?)(\d{4,5})(\d{4})$/;
        return str
            .replace(/\D/g, '')
            .replace(regex,
            (fullMatch, country, ddd, prefixTel, suffixTel) => {
                if (country) return `+${ country } (${ ddd }) ${ prefixTel }-${ suffixTel}`;
                if (ddd) return `(${ ddd }) ${ prefixTel }-${ suffixTel}`;
                if (prefixTel && suffixTel) return `${ prefixTel }-${ suffixTel }`;
                return str;
            }
        );
    }

    function alterarDados() {
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const genero = document.getElementById('genero');
        const numero = document.getElementById('telefone');
        const imagem = document.getElementById('inputFoto');

        const cleanNumber = numero.value.replace(/\D/g, "");
        const regexLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex = /^[1-9]{2}\d{9}$/;
        let validar = [];

        if(isSubmitting) return;
        isSubmitting = true;

        if(!regexLetras.test(nome.value)) { validar.push(nome); } else { nome.style.borderColor = "#e5e7eb"; }
        if(!emailPattern.test(email.value)) { validar.push(email); } else { email.style.borderColor = "#e5e7eb"; }
        if(!regexLetras.test(genero.value)) { validar.push(genero); } else { genero.style.borderColor = "#e5e7eb"; }
        if(cleanNumber !== "" && !regex.test(cleanNumber)) { validar.push(numero); } else { numero.style.borderColor = "#e5e7eb"; }

        if(validar.length === 0) {
            const formData = new FormData();

            formData.append('nome', nome.value);
            formData.append('email', email.value);
            formData.append('genero', genero.value);
            formData.append('cleanNumber', cleanNumber);
            formData.append('imagem', imagem.files[0]);

            fetch('/profile/allData', {
                method: "PUT",
                body: formData
            })
            .then((res)=> {
                return res.json();
            })
            .then((corpo)=> {
                if(corpo.ok) {
                    window.location.reload();
                } else {
                    return alert('ERRO EM ALTERAR DADOS FETCH FINAL.');
                }
            })
            .finally(()=> {
                isSubmitting = false;
            })

        } else {
            for(let i = 0; i < validar.length; i++) {
                validar[i].style.borderColor = "red";
            }
            isSubmitting = false;
        }
    }

    acoes.forEach(acao => {
        acao.addEventListener('click', (e)=> {
            idAddress = e.currentTarget.dataset.idAddressEdit;
            const container = e.currentTarget.closest('.edit-addr-container');

            const cep = container.querySelector('.inputCepEdit');
            const logradouro = container.querySelector('.inputRuaEdit');
            const numero = container.querySelector('.inputNumeroEdit');
            const complemento = container.querySelector('.inputComplementoEdit');
            const bairro = container.querySelector('.inputBairroEdit');
            const cidade = container.querySelector('.inputCidadeEdit');
            const uf = container.querySelector('.inputEstadoEdit');

            const parts = window.location.pathname.split("/");
            const idParams = Number(parts[parts.length - 1]);

            const regexEndereco = /^(?!\s*$)(?!.*([.,-])\1)(?![.,-])(?!.*[.,-]$)[A-Za-zÀ-ÖØ-öø-ÿ0-9ºª]+(?:[ .,-][A-Za-zÀ-ÖØ-öø-ÿ0-9ºª]+)*$/;
            const regexNumero = /^[0-9]+$/
            const regexLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/

            if (isSubmitting) return;
            isSubmitting = true;
            let listaValidar = [];

            if(cep.value === "" || !regexNumero.test(cep.value)) { listaValidar.push(cep) } else { cep.style.borderColor = "#f9fafb"; }
            if(logradouro.value === "" || !regexLetras.test(logradouro.value)) { listaValidar.push(logradouro) } else { logradouro.style.borderColor = "#f9fafb"; }

            if(numero.value === "") { 
                numero.value = "n/a";
                numero.style.borderColor = "#f9fafb";
            } else if (!regexNumero.test(numero.value) && numero.value !== "n/a") {
                listaValidar.push(numero)
            } else {
                numero.style.borderColor = "#f9fafb";
            }

            if(complemento.value === "") { 
                complemento.value = "n/a"; 
            } else if (!regexEndereco.test(complemento.value) && complemento.value !== "n/a") {
                listaValidar.push(complemento)
            } else {
                complemento.style.borderColor = "#f9fafb";
            }

            if(bairro.value === "" || !regexLetras.test(bairro.value)) { listaValidar.push(bairro) } else { bairro.style.borderColor = "#f9fafb"; }
            if(cidade.value === "" || !regexLetras.test(cidade.value)) { listaValidar.push(cidade) } else { cidade.style.borderColor = "#f9fafb"; }
            if(uf.value === "" || !regexLetras.test(uf.value) || uf.value.length !== 2) { listaValidar.push(uf) } else { uf.style.borderColor = "#f9fafb"; }

            if(listaValidar.length == 0) {

                let obj = {
                    cep: cep.value,
                    logradouro: logradouro.value,
                    numero: numero.value,
                    complemento: complemento.value,
                    bairro: bairro.value,
                    cidade: cidade.value,
                    uf: uf.value,
                    idAddress: idAddress
                }

                fetch(`/profile/addressAlter/${idParams}`, {
                    method: "PUT",
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
                        return alert('ERRO IN RETURN BODY IS NOT -- OK --');
                    }
                })
                .finally(() => {
                    isSubmitting = false;
                });

            } else {
                for(let i = 0; i < listaValidar.length; i++) {
                    listaValidar[i].style.borderColor = "rgba(253, 144, 144, 0.87)";
                }
                isSubmitting = false;
            }
        });
    });
})