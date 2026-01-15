
import UserModel from "../models/userModel.js";

export default class DashboardController {
    async dashboardView(req, res) {
        const banco = new UserModel();
        const lista = 

        res.render('Dashboard/dashboardPage', { layout: false });
    }
}