
import AddressModel from "../models/addressModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import ProductService from "../services/productService.js";
import EstoqueModel from "../models/estoqueModel.js";

export default class ShopController {
    async shopProductView(req, res) {
        let id = null;
        let perID = null;
        let idProduto = req.params.id;

        if(req.user) id = req.user.id;
        if(req.user) perID = req.user.perID;

        const banco = new ProductModel();
        const bancoEstoque = new EstoqueModel();

        const listaOutros = await banco.listarProdutos();
        const listaProduct = await banco.listarProdutosPorID(idProduto);
        const listaEstoque = await bancoEstoque.procurarEstoqueID(idProduto);

        res.render('Shop/shopProductPage.ejs', { user: id, perfil: perID, layout: 'layout', listaProduct: listaProduct, listaOutros: listaOutros, listaEstoque: listaEstoque });
    }
    
    async checkoutView(req, res) {
        let id = null;
        let perID = null;

        if(req.user) id = req.user.id;
        if(req.user) perID = req.user.perID;

        const banco = new UserModel();
        const bancoEndereco = new AddressModel();
        const lista = await banco.listarUsuarioPeloID(id);
        const listaAddress = await bancoEndereco.listarEnderecos(id);
        
        res.render('Shop/checkout.ejs', { layout: 'layout.ejs', user: id, perfil: perID, lista: lista, listaAddress: listaAddress });
    }

    async pagamentoView(req, res) {
        let id = null;
        let perID = null;

        if(req.user) id = req.user.id;
        if(req.user) perID = req.user.perID;

        res.render('Shop/payment.ejs', { layout: 'layout.ejs', user: id, perfil: perID });
    }

    async pagamento(req, res) {
        try {
            const { carrinho, pagamento, usuarioID } = req.body;
            if(!carrinho || !pagamento || !usuarioID) return res.status(400).json({ message: "Falha ao enviar os dados!", ok: false });

            const banco = new ProductService();
            const result = await banco.saveSaleWithItems(req.body);

            return res.status(201).json({
                sucesso: true,
                venID: result,
                ok: true
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: "Erro na requisção!", ok: false });
        }
    }
}