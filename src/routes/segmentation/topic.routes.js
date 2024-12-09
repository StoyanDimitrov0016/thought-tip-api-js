import { Router } from "express";
import inputValidator from "../../middleware/validators/inputValidator.js";
import { idValidator } from "../../middleware/validators/idValidator.js";
import { topicController as controller } from "../../controllers/segmentation.controller.js";
import { createSchema, updateSchema } from "../../lib/validationSchemas/segmentation/client.js";

const id = "categoryId";
const topicRoutes = Router();

topicRoutes.get("/", controller.getAll);
topicRoutes.get(`/${id}`, idValidator(id), controller.getOne);

topicRoutes.post("/", inputValidator(createSchema), controller.create);
topicRoutes.put(`/${id}`, idValidator(id), inputValidator(updateSchema), controller.update);
topicRoutes.delete(`/${id}`, idValidator(id), controller.remove);

export default topicRoutes;
