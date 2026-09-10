import app  from "./app/app.js"
import connectDB from "./config/db.config.js";
import config from "./config/env.config.js";


const PORT = config.port;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});