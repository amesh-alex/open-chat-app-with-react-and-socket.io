import { config } from "./src/config/config";

import httpServer from "./src/server";

httpServer.listen(config.port, () => {
    console.log(`Server is running in port ${config.port}`);
});