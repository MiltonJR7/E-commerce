
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
        res.render('Home/perfilPage', { user: id, perfil: perID });
    }
}