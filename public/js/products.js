document.addEventListener("DOMContentLoaded", () => {
    const categoriaSelect = document.getElementById("categoria");
    const subcategoriaSelect = document.getElementById("subcategoria");
    const idSalvo = subcategoriaSelect.dataset.idSubcategoria; 

    const subcategorias = JSON.parse(
        document.getElementById("data-subcats").textContent
    );

    function carregarSubcats() {
        const catId = categoriaSelect.value;

        subcategoriaSelect.innerHTML = "";
        subcategoriaSelect.disabled = true;

        if (!catId) {
            subcategoriaSelect.innerHTML = `<option value="">Selecione a categoria primeiro</option>`;
            return;
        }

        const filtradas = subcategorias.filter(s => String(s.catID) === String(catId));

        if(subcategoriaSelect === "") {
            subcategoriaSelect.innerHTML = `<option value="">Selecione</option>`;
        }

        filtradas.forEach(sub => {
            let selected = "";
            if(sub.subID == idSalvo) {
                selected = "selected";
            }
            subcategoriaSelect.insertAdjacentHTML(
                "beforeend",
                `<option value="${sub.subID}" ${selected}>${sub.subNome}</option>`
            );
        });

        subcategoriaSelect.disabled = false;
    }

    categoriaSelect.addEventListener("change", carregarSubcats);
    carregarSubcats();
});
