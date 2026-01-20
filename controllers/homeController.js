import UserModel from "../models/userModel.js";

export default class HomeController {
    async homeView(req, res) {
        let id = null;
        let perID = null;

        if(req.user) id = req.user.id;
        if(req.user) perID = req.user.perID;
        res.render('Home/homePage', { user: id, perfil: perID });
    }

    async perfilView(req, res) {
        let id = null;
        let perID = null;

        if(req.user) id = req.user.id; 
        if(req.user) perID = req.user.perID;

        const banco = new UserModel();
        const lista = await banco.listarUsuarioPeloID(id);
        res.render('Home/perfilPage', { user: id, perfil: perID, lista: lista });
    }
}