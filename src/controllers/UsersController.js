const sqliteConnection = require("../database/sqlite");
const {hash , compare} = require("bcrypt")
const AppError = require("../utils/AppError");

class UsersController {
   async create(request, response){
    //Capturando os parâmetros do corpo da requisição
    const{ name, email, password, isAdmin = false} = request.body;

    // Fazendo a conexão com o banco de dados    
    const database = await sqliteConnection();
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    //Verificando se o email já está em uso por outro usuário.
    if(checkUserExists){
        throw new AppError("Este e-mail já está em uso!");
    }

    //Criptografando a senha do usuário.
    const hashedPassword = await hash(password, 8)

    //Inserindo os dados do usuário no banco de dados.
    await database.run(
        "INSERT INTO users (name, email, password, isAdmin) VALUES (?,?,?,?)",
        [name, email,hashedPassword, isAdmin]
    );

    return response.status(201).json({message: "Usuário criado com sucesso!"});
    
    }

    async update(request, response){
        //capturando os parâmetros do corpo da requisição
        const {name, email, password, old_password, isAdmin} = request.body;
        const user_id = request.user.id;

        //Fazendo a conexão com o banco de dados
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        //Verificação do usuário
        if(!user){
            throw new AppError("Usuário não encontrado!")
        };

        //Atualização do e-mail do usuário
        const userWithUpdatedEmail = await database.get
        ("SELECT * FROM users WHERE email = (?)",
         [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está cadastrado.")
        }

        //Atualizando os novos dados do usuário
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        //Verificação para alteração de senha do usuário
        if (password && !old_password){
            throw new AppError("Informar a senha antiga é obrigatório para definir uma nova senha")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga está incorreta.")
            }

            user.password = await hash(password, 8)
        }

        //Atualizando os dados no banco de dados
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, new Date(), user_id]
            )

            return response.status(201).json({message: "Usuário atualizado com sucesso"})

    }
}

module.exports = UsersController;