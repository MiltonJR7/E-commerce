
import UserModel from "../models/userModel.js";

export default class DashboardController {
    async dashboardView(req, res) {
        
        try {
            const banco = new UserModel();
            const lista = await banco.listarUsuarios();

            if(lista === null) return res.status(400).json({ mensage: "Erro na lista retornada!" });

            res.render('Dashboard/dashboardPage', { layout: false, lista: lista });
        } catch(err) {
            console.log(err);
            res.status(500).json({ mensage: "Erro em try lista" });
        }
    }
}