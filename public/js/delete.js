

document.addEventListener('DOMContentLoaded', ()=> {
    const btn = document.querySelectorAll('.btnDeletar');
    for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e)=> {
            const idUsers = e.currentTarget.dataset.deleteusers;
            const idAddress = e.currentTarget.dataset.deleteaddress;
            let router = "";
            let id = "";

            console.log(idUsers);
            console.log(idAddress);

            if(idUsers) {
                router = "delete";
                id = idUsers;
            } else {
                router = "endereco/delete";
                id = idAddress;
            }

            deletar(id, router);
        });
    }

    function deletar(id, router) {

        try {
            let obj = id;

            if(confirm("Os dados seram deletados apos a confirmação, deseja confirmar?")) {
                fetch(`/dashboard/${router}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({obj})
                })
                .then((res)=> {
                    return res.json();
                })
                .then((corpo)=> {
                    if(corpo.ok) {
                        window.location.reload();
                    } else {
                        alert("Error na confirmação do corpo.");
                    }
                })
            }

        } catch(err) {
            console.log(err);
            return err;
        }
    }
})