import { Router, Response, Request } from "express";
import { AccountRouter } from "../controller/Accounts";
import { Auth } from "../middleware/auth";
import { PostsRouter } from "../controller/Posts";
import { RecipesRouter } from "../controller/Recipes";
import { IngredientRouter } from "../controller/Ingredient";
import { ingredientTypeRouter } from "../controller/ingredientType";
export const router: Router = Router();

router.use("/accounts", AccountRouter);

router.get("/test", Auth, (req: Request, res: Response) => {
  res.send({ sample: "hi" });
});
router.use("/posts", Auth, PostsRouter);
router.use("/recipes", Auth, RecipesRouter);
router.use("/ingredient", Auth, IngredientRouter);
router.use("/ingredient_type", ingredientTypeRouter);
export const apiRouter: Router = router;
