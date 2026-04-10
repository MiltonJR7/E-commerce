

document.addEventListener('DOMContentLoaded', ()=> {
    const btn = document.querySelectorAll('.btnDeletar, .btnDeletarServices');
    for(let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', (e)=> {
            const idUser = e.currentTarget.dataset.deleteUser;
            const idAddress = e.currentTarget.dataset.deleteAddress;
            const idUserEdit = e.currentTarget.dataset.deleteUserEditPage;
            const idAddressProfile = e.currentTarget.dataset.deleteAddressProfile;
            const idProduct = e.currentTarget.dataset.deleteProduct;

            const parts = window.location.pathname.split("/");
            const idParams = Number(parts[parts.length - 1]);

            let router = "";
            let id = "";

            if(idUser) {
                router = `/dashboard/${idUser}`;
                id = idUser;
            } else if(idAddress) {
                router = `/dashboard/address/${idAddress}`;
                id = idAddress;
            } else if(idUserEdit){
                router = `/dashboard/user/delete/${idUserEdit}`;
                id = idUserEdit;
            } else if(idAddressProfile) {
                router = `/profile/${idAddressProfile}`;
                id = idAddressProfile;
            } else if(idProduct) {
                router = `/dashboard/products/${idProduct}`;
                id = idProduct;
            } else {
                router = `/dashboard/products/delete/${idParams}`;
                id = idParams;
            }

            deletar(id, router);
        });
    }

    async function deletar(id, router) {
        let obj = id;

        await finishOrder();
        if(finishOrder === true) {
            fetch(`${router}`, {
                method: "DELETE",
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
                    if(window.location.pathname === `/dashboard/user/${id}` || window.location.pathname === `/dashboard/products/${id}`) {
                        window.location.href = "/dashboard"; 
                    } else { 
                        window.location.reload();
                    }
                }
            });
        }
    }

    async function finishOrder() {
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
                            background: #ef4444;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 1rem;
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.29 3.86l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.71-3.14l-8-14a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>

                        <h3 style="color: #1f2937; margin-bottom: 0.5rem;">
                            Excluir componente
                        </h3>

                        <p style="color: #6b7280; margin-bottom: 1.5rem;">
                            Tem certeza que deseja excluir este componente? Esta ação não pode ser desfeita.
                        </p>

                        <button class="btn btn-success" id="btnConfirm" style="background-color: #157347; color: white">
                            Confirmar
                        </button>
                        <button class="btn btn-danger" id="btnCancel" style="background-color: #BB2D3B; color: white">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmation);

            const confirm = document.getElementById('btnConfirm');
            const cancel = document.getElementById('btnCancel');

            confirm.addEventListener('click', ()=> {
                confirmation.remove();
                resolve(true);
            });

            cancel.addEventListener('click', ()=> {
                confirmation.remove();
                resolve(false);
            });
        });
    }
})