import { createRequire } from "module";

const require = createRequire(import.meta.url);
const handler = require("../../../api/connect/account-status.js");

export default handler;
