import express from "express";
import cors from "cors";
//middlewara
express.json();

server.use(productRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
