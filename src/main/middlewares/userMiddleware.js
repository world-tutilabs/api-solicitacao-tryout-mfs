const http = require("../config/http")

class VerifyUserMiddleware {
  constructor() {}

  async VerifyUserLogged(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(401).json({ status: 'error', message: 'Token is missing' });
    }

    const [_, token] = tokenHeader.split(" ")

    try {
      const response = await http.post("/session/verify", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status == 401) {
        return res.status(401).json({ status: 'error', message: 'not authorized' });
      }

      const authorization = response.data.user.User_Sistema.find(us => us.sistema.descricao === "TRYOUT") && response.data.user.status


      if (!authorization) {
        return res.status(401).json({ status: 'error', message: 'not authorized' });
      }

      req.user = response.data.user
      next()
    } catch (error) {
      return res.status(401).json({ status: 'error', message: 'not authorized' });
    }
  }

  async VerifyUserEngineerAdmin(req, res, next) {
    const { user } = req
    if (user.nivel_de_acesso.descricao !== "eng_admin") {
      return res.status(401).json({ status: 'error', message: 'not authorized' });
    }
    return next()
  }

  async VerifyUserEngineerAnalyst(req, res, next) {
    const { user } = req
    if (user.nivel_de_acesso.descricao === "eng_analista" || user.nivel_de_acesso.descricao === "eng_admin") {
      return next()
    }
    return res.status(401).json({ status: 'error', message: 'not authorized' });
  }

  async verifyUserEngineerDefault(req, res, next) {
    const { user } = req
    if (user.nivel_de_acesso.descricao === "eng" || user.nivel_de_acesso.descricao === "eng_admin" || user.nivel_de_acesso.descricao === "eng_analista" ) {
      return next()
    }
    return res.status(401).json({ status: 'error', message: 'not authorized' });
  }
}

module.exports = new VerifyUserMiddleware()
