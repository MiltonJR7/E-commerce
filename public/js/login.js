
document.addEventListener('DOMContentLoaded', ()=> {
    const btn = document.getElementById('btnLogar');
    btn.addEventListener('click', logarSystem);

    function logarSystem() {
        const email = document.getElementById('email');
        const senha = document.getElementById('password');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let listaValidar = [];

        if(email.value === "" || !emailPattern.test(email.value)) { listaValidar.push(email) } else { email.style.borderColor = "rgba(15, 23, 42, 0.15)"; }
        if(senha.value === "" || senha.value.length < 6) { listaValidar.push(senha) } else { senha.style.borderColor = "rgba(15, 23, 42, 0.15)"; }

        if(listaValidar.length == 0) {

            let obj = {
                email: email.value,
                senha: senha.value
            }

            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            .then((res)=> {
                return res.json();
            })
            .then((corpo)=> {
                if(corpo.ok) {
                    if(corpo.id == 1) {
                        window.location.href = "/"; //Apos criacao da dashboard sera implementado para rota de dashboard o usuario com id 1 de administrador.
                    } else {
                        window.location.href = "/";
                    }
                }
            })

        } else {
            for(let i = 0; i < listaValidar.length; i++) {
                listaValidar[i].style.borderColor = "red";
            }
        }
    }
})