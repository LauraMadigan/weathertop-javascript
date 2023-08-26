import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import handlebarsDateformat from "handlebars-dateformat";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";



const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({
  extname: ".hbs",
  helpers: {
    dateFormat: handlebarsDateformat
  }
}));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

app.use(express.static('public')); // serve static files from the public folder

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`WeatherTop started on http://localhost:${listener.address().port}`);
});
