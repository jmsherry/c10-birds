import path from 'path';
import birdsRouter from "./birds.router.js"

const {} = process.env;

export default function setupRoutes(app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";
  app.use(
    `${API_ENDPOINT}/${API_VERSION}/birds`,
    birdsRouter
  );

  app.get("*", (req, res) => {
    if (req.xhr) {
      return res.sendStatus(404);
    }
    if (NODE_ENV === "production") {
      return res.sendFile(
        path.join(__dirname, "../../client/", "dist/index.html")
      );
    }
    res.redirect("/");
  });


  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
}