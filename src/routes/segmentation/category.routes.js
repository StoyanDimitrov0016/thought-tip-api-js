import { Router } from "express";
import inputValidator from "../../middleware/validators/inputValidator.js";
import { idValidator } from "../../middleware/validators/idValidator.js";
import { categoryController as controller } from "../../controllers/segmentation.controller.js";
import { createSchema, updateSchema } from "../../lib/validationSchemas/segmentation/client.js";

const id = "categoryId";
const categoryRoutes = Router();

categoryRoutes.get("/", controller.getAll);
categoryRoutes.get(`/${id}`, idValidator(id), controller.getOne);

categoryRoutes.post("/", inputValidator(createSchema), controller.create);
categoryRoutes.put(`/${id}`, idValidator(id), inputValidator(updateSchema), controller.update);
categoryRoutes.delete(`/${id}`, idValidator(id), controller.remove);

export default categoryRoutes;
