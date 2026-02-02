
document.addEventListener('DOMContentLoaded', ()=> {
    const rota = window.location.pathname;
    
    if(rota === "/dashboard") {
        const users = document.querySelectorAll('.users');
        
        users.forEach(users => {
            return users.classList.add('active');
        });
    } else if(rota === "/dashboard/address") {
        const address = document.querySelectorAll('.address');
        
        address.forEach(address => {
            return address.classList.add('active');
        });
    } else {
        const products = document.querySelectorAll('.products');

        products.forEach(products => {
            return products.classList.add('active');
        });
    }
})