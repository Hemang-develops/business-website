import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/connect/accounts.js");

export default handler;
