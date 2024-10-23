import { Application, Router } from "@oak/oak";
import { MongoClient } from "@db/mongo";
import { create, verify } from "@zaubrik/djwt";
import { hash, compare } from "@ts-rex/bcrypt";

const router = new Router();
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
