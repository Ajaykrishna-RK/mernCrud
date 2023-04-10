const express = require("express");
const dbConnection = require("./config/dbConnection");
const cors = require("cors")
const LitreatureControllers = require("./controllers/LiteratureControllers")
const app = express()


    require("dotenv").config();
    app.use(express.json());
    app.use(cors())

  dbConnection()

 


app.get("/posts",LitreatureControllers.FetchAllLiteratures)
app.post("/posts",LitreatureControllers.PostLitrature)
app.put("/posts/:id",LitreatureControllers.UpdateLiterature)
app.get("/posts/:id",LitreatureControllers.FetchLiterature)
app.delete("/posts/:id",LitreatureControllers.deleteLiterature)

app.listen(process.env.PORT)