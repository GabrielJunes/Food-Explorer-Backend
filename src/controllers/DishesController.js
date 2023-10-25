const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");


class DishesController {
    async create(request, response){
        //Capturando os parâmetros do corpo da requisição
        const { name, description, category, price, ingredients} = request.body;
        const user_id = request.user.id;
       
        //requisitando o arquivo de imagem
        const imageFileName = request.file.filename;

        //instanciando o diskStorage
        const diskStorage = new DiskStorage()
        //salvando o arquivo de imagem
        const filename = await diskStorage.saveFile(imageFileName);

        const ingredientsArray = JSON.parse(ingredients || '[]');

        //inserindo as informações no banco de dados.
        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            category,
            price,
            image: filename,
            created_by: user_id,
            updated_by: user_id,
          });
      
          const ingredientsInsert = ingredientsArray.map((name) => {
            return {
              dish_id,
              name,
              created_by: user_id,
            };
          });
      
          await knex("ingredients").insert(ingredientsInsert);
      
          return response.status(201).json({message:"Prato cadastrado com sucesso!"});
    }

    async update(request, response){
      //Capturando os parâmetros do corpo da requisição e o parâmetro do ID
        const { id } = request.params;
        const { name, description, category, price, ingredients } = request.body;

        //Requisitando o arquivo de imagem
        const imageFileName = request.file.filename;

        //Procurando  o prato através do ID informado
        const dish = await knex("dishes").where({ id }).first();


        if (!dish) {
          throw new AppError("Prato não encontrado.", 404);
        }
        //Atualizando os dados do prato
        const dishUpdate = {
          name: name ?? dish.name,
          description: description ?? dish.description,
          category: category ?? dish.category,
          price: price ?? dish.price,
          updated_by: request.user.id,
          updated_at: knex.fn.now(),
        };

        //Atualizando a imagem do prato e excluíndo a imagem antiga
        if (imageFileName) {
          const diskStorage = new DiskStorage();

          if (dish.image) {
            await diskStorage.deleteFile(dish.image);
          }

          const filename = await diskStorage.saveFile(imageFileName);
          dishUpdate.image = filename;
        }

        //Atualizando os ingredientes
        if (ingredients) {
          await knex("ingredients").where({ dish_id: id }).delete();

          const ingredientsInsert = ingredients.map((name) => {
            return {
              dish_id: id,
              name,
              created_by: dish.created_by,
            };
          });

          await knex("ingredients").insert(ingredientsInsert);
        }

        await knex("dishes").where({ id }).update(dishUpdate);

        return response.json();
    }

    async show(request, response){
      //Capturando os parâmetros do ID
        const { id } = request.params;
        //buscando o prato e os ingredientes através do ID informado
        const dish = await knex("dishes").where({ id }).first();
        const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

        return response.json({
            ...dish,
            ingredients,
        });
    }

    async delete(request, response){
      //Capturando os parâmetros do ID
        const { id } = request.params
        //Deletando o prato através do ID informado
        await knex("dishes").where({ id }).delete();

        return response.json({message:"O prato foi excluído com sucesso."})
    }

    async index(request, response) {
      //Capturando os parâmetros da query
        const { search } = request.query;
    
        let dishes;
    
        if (search) {
          const keywords = search.split(" ").map((keyword) => `%${keyword}%`);
    
          dishes = await knex("dishes")
            .select([
              "dishes.id",
              "dishes.name",
              "dishes.description",
              "dishes.category",
              "dishes.price",
              "dishes.image",
            ])
            .leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
            .where((builder) => {
              builder.where((builder2) => {
                keywords.forEach((keyword) => {
                  builder2.orWhere("dishes.name", "like", keyword);
                  builder2.orWhere("dishes.description", "like", keyword);
                });
              });
              keywords.forEach((keyword) => {
                builder.orWhere("ingredients.name", "like", keyword);
              });
            })
            .groupBy("dishes.id")
            .orderBy("dishes.name");
        } else {
          dishes = await knex("dishes")
            .select([
              "dishes.id",
              "dishes.name",
              "dishes.description",
              "dishes.category",
              "dishes.price",
              "dishes.image",
            ])
            .orderBy("dishes.name");
        }
    
        const dishesIngredients = await knex("ingredients");
        const dishesWithIngredients = dishes.map((dish) => {
          const dishIngredients = dishesIngredients.filter((ingredient) => ingredient.dish_id === dish.id);
    
          return {
            ...dish,
            ingredients: dishIngredients,
          };
        });
    
        return response.json(dishesWithIngredients);
    }

}

module.exports = DishesController;