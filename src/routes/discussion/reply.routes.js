import { Router } from "express";
import { replyController as controller } from "../../controllers/discussion.controller.js";
import inputValidator from "../../middleware/validators/inputValidator.js";
import { idValidator } from "../../middleware/validators/idValidator.js";
import { upcomingSchemas } from "../../lib/validationSchemas/discussion.js";

const { create: createSchema, update: updateSchema } = upcomingSchemas;
const id = "id";
const router = Router();

router.get("/", controller.getAll);
router.get(`/:${id}`, idValidator(id), controller.getOne);

router.post("/", inputValidator(createSchema), controller.create);
router.put(`/:${id}`, inputValidator(updateSchema), idValidator(id), controller.update);
router.delete(`/:${id}`, idValidator(id), controller.remove);

export { router };
