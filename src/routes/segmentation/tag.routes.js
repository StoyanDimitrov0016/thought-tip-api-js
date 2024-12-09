import { Router } from "express";
import inputValidator from "../../middleware/validators/inputValidator.js";
import { idValidator } from "../../middleware/validators/idValidator.js";
import { tagController as controller } from "../../controllers/segmentation.controller.js";
import { createSchema, updateSchema } from "../../lib/validationSchemas/segmentation/client.js";

const id = "tagId";
const tagRoutes = Router();

tagRoutes.get("/", controller.getAll);
tagRoutes.get(`/${id}`, idValidator(id), controller.getOne);

tagRoutes.post("/", inputValidator(createSchema), controller.create);
tagRoutes.put(`/${id}`, idValidator(id), inputValidator(updateSchema), controller.update);
tagRoutes.delete(`/${id}`, idValidator(id), controller.remove);

export default tagRoutes;
