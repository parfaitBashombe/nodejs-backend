import "dotenv/config";
import app, { PORT } from "./app/app";

app.listen(PORT, () => {
  console.log(`server listening on: http://localhost:${PORT}`);
});
