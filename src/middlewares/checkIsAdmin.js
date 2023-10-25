const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function checkIsAdmin(request, response, next) {
  const user_id = request.user.id;

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.isAdmin) {
    throw new AppError("Apenas usuários com perfil de administrador podem realizar esta ação.", 403);
  }

  return next();
}

module.exports = checkIsAdmin;
